import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export type UserRole = "admin" | "operator";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 32, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255 })
  password_hash!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 16, default: "operator" })
  role!: UserRole;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;
}
