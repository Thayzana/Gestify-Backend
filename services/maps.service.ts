export interface AddressParts {
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
}

export interface DeliveryEstimateInput {
  origin?: string;
  destination?: string;
  destinationParts?: AddressParts;
}

export interface DeliveryEstimateResult {
  distanceKm: number;
  durationMinutes: number;
  drivingMinutes: number;
  prepBufferMinutes: number;
  estimatedTime: string;
  source: "google" | "osrm" | "fallback";
  originAddress: string;
  destinationAddress: string;
  googleMapsUrl: string;
  wazeUrl: string;
}

const PREP_BUFFER_MINUTES = 15;
const USER_AGENT = "Gestify/1.0 (delivery-estimate)";

export function buildAddressFromParts(parts: AddressParts): string {
  const cep = parts.cep?.replace(/\D/g, "") ?? "";
  const segments = [
    parts.rua?.trim(),
    parts.numero?.trim(),
    parts.bairro?.trim(),
    parts.cidade?.trim(),
    parts.estado?.trim()?.toUpperCase(),
    cep.length === 8 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : "",
    "Brasil",
  ].filter(Boolean);
  return segments.join(", ");
}

function encodeAddress(address: string): string {
  return encodeURIComponent(address.trim());
}

function formatEstimateRange(totalMinutes: number): string {
  const base = Math.max(20, Math.ceil(totalMinutes / 5) * 5);
  const low = base;
  const high = base + 10;
  return `${low}-${high} min`;
}

function buildNavigationUrls(origin: string, destination: string) {
  const originEnc = encodeAddress(origin);
  const destEnc = encodeAddress(destination);
  return {
    googleMapsUrl: `https://www.google.com/maps/dir/?api=1&origin=${originEnc}&destination=${destEnc}&travelmode=driving`,
    wazeUrl: `https://waze.com/ul?q=${destEnc}&navigate=yes`,
  };
}

function fallbackEstimate(
  origin: string,
  destination: string,
  reason?: string
): DeliveryEstimateResult {
  const drivingMinutes = 25;
  const urls = buildNavigationUrls(origin || "Loja", destination);
  if (reason) {
    console.warn("[maps] fallback estimate:", reason);
  }
  return {
    distanceKm: 5,
    durationMinutes: drivingMinutes + PREP_BUFFER_MINUTES,
    drivingMinutes,
    prepBufferMinutes: PREP_BUFFER_MINUTES,
    estimatedTime: formatEstimateRange(drivingMinutes + PREP_BUFFER_MINUTES),
    source: "fallback",
    originAddress: origin,
    destinationAddress: destination,
    ...urls,
  };
}

async function geocodeNominatim(
  address: string
): Promise<{ lat: number; lon: number } | null> {
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({
      q: address,
      format: "json",
      limit: "1",
      countrycodes: "br",
    }).toString();

  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as Array<{ lat: string; lon: string }>;
  if (!data.length) return null;

  return { lat: Number(data[0].lat), lon: Number(data[0].lon) };
}

async function estimateWithGoogle(
  origin: string,
  destination: string,
  apiKey: string
): Promise<DeliveryEstimateResult> {
  const params = new URLSearchParams({
    origins: origin,
    destinations: destination,
    mode: "driving",
    language: "pt-BR",
    region: "br",
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`
  );
  if (!res.ok) {
    throw new Error(`Google Distance Matrix HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    status: string;
    error_message?: string;
    rows?: Array<{
      elements?: Array<{
        status: string;
        distance?: { value: number };
        duration?: { value: number };
      }>;
    }>;
  };

  if (data.status !== "OK") {
    throw new Error(data.error_message || `Google status: ${data.status}`);
  }

  const element = data.rows?.[0]?.elements?.[0];
  if (!element || element.status !== "OK" || !element.duration || !element.distance) {
    throw new Error(`Google element status: ${element?.status ?? "missing"}`);
  }

  const drivingMinutes = Math.ceil(element.duration.value / 60);
  const distanceKm = Math.round((element.distance.value / 1000) * 10) / 10;
  const totalMinutes = drivingMinutes + PREP_BUFFER_MINUTES;
  const urls = buildNavigationUrls(origin, destination);

  return {
    distanceKm,
    durationMinutes: totalMinutes,
    drivingMinutes,
    prepBufferMinutes: PREP_BUFFER_MINUTES,
    estimatedTime: formatEstimateRange(totalMinutes),
    source: "google",
    originAddress: origin,
    destinationAddress: destination,
    ...urls,
  };
}

async function estimateWithOsrm(
  origin: string,
  destination: string,
  originCoords: { lat: number; lon: number },
  destCoords: { lat: number; lon: number }
): Promise<DeliveryEstimateResult> {
  const coords = `${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}`;
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${coords}?overview=false`
  );
  if (!res.ok) {
    throw new Error(`OSRM HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    code: string;
    routes?: Array<{ distance: number; duration: number }>;
  };

  if (data.code !== "Ok" || !data.routes?.[0]) {
    throw new Error(`OSRM code: ${data.code}`);
  }

  const route = data.routes[0];
  const drivingMinutes = Math.ceil(route.duration / 60);
  const distanceKm = Math.round((route.distance / 1000) * 10) / 10;
  const totalMinutes = drivingMinutes + PREP_BUFFER_MINUTES;
  const urls = buildNavigationUrls(origin, destination);

  return {
    distanceKm,
    durationMinutes: totalMinutes,
    drivingMinutes,
    prepBufferMinutes: PREP_BUFFER_MINUTES,
    estimatedTime: formatEstimateRange(totalMinutes),
    source: "osrm",
    originAddress: origin,
    destinationAddress: destination,
    ...urls,
  };
}

export function isGoogleMapsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_MAPS_API_KEY?.trim());
}

export async function estimateDeliveryTime(
  input: DeliveryEstimateInput
): Promise<DeliveryEstimateResult> {
  const destination =
    input.destination?.trim() ||
    (input.destinationParts ? buildAddressFromParts(input.destinationParts) : "");

  if (!destination || destination.replace(/[^a-zA-Z0-9]/g, "").length < 8) {
    throw new Error("Endereço de entrega incompleto para calcular a rota.");
  }

  const origin =
    input.origin?.trim() ||
    process.env.STORE_ORIGIN_ADDRESS?.trim() ||
    "";

  if (!origin) {
    return fallbackEstimate("", destination, "STORE_ORIGIN_ADDRESS não configurado");
  }

  const googleKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (googleKey) {
    try {
      return await estimateWithGoogle(origin, destination, googleKey);
    } catch (err) {
      console.warn("[maps] Google Maps indisponível, tentando OSRM:", err);
    }
  }

  try {
    const [originCoords, destCoords] = await Promise.all([
      geocodeNominatim(origin),
      geocodeNominatim(destination),
    ]);

    if (originCoords && destCoords) {
      return await estimateWithOsrm(origin, destination, originCoords, destCoords);
    }
  } catch (err) {
    console.warn("[maps] OSRM indisponível:", err);
  }

  return fallbackEstimate(origin, destination, "provedores de rota indisponíveis");
}
