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
import { Chapters } from "./ChapterEntity"

@Entity("content")
export class Contents {
  constructor(content: Partial<Contents>) {
    Object.assign(this, content)
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(()=> Chapters, chapter => chapter.content )
  @JoinColumn({ name: "chapterId" })
  contentChapter: Chapters


  @Column()
  @IsNotEmpty()
  videoURL: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  @BeforeInsert()
  generateUUID() {
    this.id = uuid()
  }
}
