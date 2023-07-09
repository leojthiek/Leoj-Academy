import { IsNotEmpty } from "class-validator"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
} from "typeorm"

import { v4 as uuid } from "uuid"
import { User } from "./UserEntity"
import { Course } from "./courseEntity"

@Entity("coursePurchase")
export class CoursePurchase {
  constructor(coursePurchase: Partial<CoursePurchase>) {
    Object.assign(this, coursePurchase)
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User)
  @IsNotEmpty()
  @JoinColumn({name:'userId'})
  user:User

  @ManyToOne(() => Course)
  @IsNotEmpty()
  @JoinColumn({name:'courseId'})
  course:Course

  @Column()
  totalPrice:string

  @Column({default:false})
  isPaid:boolean

  @Column()
  paidAt:Date
  
  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @BeforeInsert()
  generateUUID() {
    this.id = uuid()
  }
}
