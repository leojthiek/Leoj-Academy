import { IsEmail, MinLength } from "class-validator"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm"
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { Exclude, instanceToPlain } from "class-transformer"

@Entity("users")
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }

  @PrimaryGeneratedColumn("uuid")
  @Exclude()
  id: string

  @Column()
  @MinLength(3, { message: "Username must be alteast 3 character long" })
  username: string

  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email format" })
  email: string

  @Column()
  @MinLength(3, { message: "Password must be atleast 3 character long" })
  @Exclude()
  password: string

  @Column({ default: "user" })
  permission: string




  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @BeforeInsert()
  generateUUID() {
    this.id = uuid()
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  toJSON() {
    return instanceToPlain(this)
  }
}
