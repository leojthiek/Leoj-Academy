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
  OneToMany,
} from "typeorm"

import { v4 as uuid } from "uuid"
import { Course } from "./courseEntity"
import { Contents } from "./ContentEntity"

@Entity("chapter")
export class Chapters {
  constructor(chapter: Partial<Chapters>) {
    Object.assign(this, chapter)
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToMany(() => Contents, content => content.contentChapter)
  content: Contents[]

  @ManyToOne(()=>Course, course => course.chapter)
  @JoinColumn({name:'courseId'})
  course:Course

  @Column()
  @IsNotEmpty()
  Chapter_title: string

  @Column()
  @IsNotEmpty()
  Chapter_description: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @BeforeInsert()
  generateUUID() {
    this.id = uuid()
  }
}
