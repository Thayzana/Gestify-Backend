import './load-env.ts';
import { AppDataSource } from './database/data-source.ts';
import { User } from './entities/User.ts';

async function main() {
  try {
    await AppDataSource.initialize();
    const users = await AppDataSource.getRepository(User).find({ order: { id: 'ASC' } });
    console.log(JSON.stringify(users.map((u) => ({
      id: u.id,
      username: u.username,
      role: u.role,
      active: u.active,
      email: u.email,
      created_at: u.created_at,
      password_hash: u.password_hash,
    })), null, 2));
    await AppDataSource.destroy();
  } catch (error) {
    console.error('ERROR', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
main();
