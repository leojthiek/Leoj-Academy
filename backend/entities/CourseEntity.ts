import { IsNotEmpty } from "class-validator"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm"

import { v4 as uuid } from "uuid"
import { User } from "./UserEntity"
import { Chapters } from "./ChapterEntity"
import { CoursePurchase } from "./CoursePurchaseEntity"

@Entity("courses")
export class Course {
  constructor(course: Partial<Course>) {
    Object.assign(this, course)
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToMany(()=> Chapters, chapter => chapter.course)
  chapter:Chapters[]

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: "instructorId" })
  instructor: User

  @OneToMany(()=> CoursePurchase,(purchase)=> purchase.course)
  coursePurchase:CoursePurchase[]

  @Column()
  @IsNotEmpty()
  course_name: string

  @Column()
  @IsNotEmpty()
  course_image: string

  @Column()
  @IsNotEmpty()
  course_category: string

  @Column()
  @IsNotEmpty()
  course_description: string

  @Column()
  @IsNotEmpty()
  course_instructor: string

  @Column()
  @IsNotEmpty()
  course_price: string

  @Column({ default: 0 })
  @IsNotEmpty()
  numOfReviews: number

  @Column({ default: 0 })
  @IsNotEmpty()
  rating: number

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @BeforeInsert()
  generateUUID() {
    this.id = uuid()
  }
}