import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Request, Response } from "express"
import config from "../config/dotenvConfig"
import { AppDataSource } from "../data-source"
import { User } from "../entities/UserEntity"
import { CoursePurchase } from "../entities/CoursePurchaseEntity"
import { Chapters } from "../entities/ChapterEntity"
import { upload } from "../middleware/multer"
import {Contents} from "../entities/ContentEntity"

interface UserRequest extends Request {
  user?: User
}

interface CustomFile extends Express.Multer.File {
  key: string
}

const s3client = new S3Client({
  region: config.region,
  credentials: {
    accessKeyId: config.aws_access_key,
    secretAccessKey: config.aws_secret_key,
  },
})

const getVideoContent = async (req: UserRequest, res: Response) => {
  try {
    const { bucketName, keyName } = req.query
    const userId = req.user?.id
    const courseId = req.params.id

    const coursePurchaseRepo = AppDataSource.getRepository(CoursePurchase)
    const coursePurchase = await coursePurchaseRepo.findOne({
      where: {
        user: { id: userId },
        course: { id: String(courseId) },
        isPaid: true,
      },
    })

    if (coursePurchase) {
      try {
        if (!keyName || !bucketName) {
          return res
            .status(400)
            .json({ errors: "No video found for the specific key or bucket" })
        }

        const command = new GetObjectCommand({
          Bucket: "leojacademy-video",
          Key: keyName.toString(),
        })
        const signedUrl = await getSignedUrl(s3client, command, {
          expiresIn: 3600,
        })
        res.status(200).json({ url: signedUrl })
      } catch (error) {
        console.log(error)
        res.status(500).json({ errors: "Internal Server Error" })
      }
    } else {
      res
        .status(403)
        .json({ errors: "Unauthorized. Please purchase the course." })
    }
  } catch (error) {
    console.error("Error generating signed URL for video:", error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}

// CREATING A CONTENT SPECIFIC WISE OF ITS CHAPTER

const createContent = async (req: Request, res: Response) => {
  const chapterId = req.params.id
  try {
   

    const courseRepository = AppDataSource.getRepository(Chapters)
    const contentChapter = await courseRepository.findOne({
      where: { id: chapterId },
    })

    if (!contentChapter) {
      return res.status(400).json({ error: "chapter not found" })
    }

    upload.single("video")(req, res, async function (err: string) {
      if (err) {
        console.log(err)
        return res.status(500).json({ errors: "failed uploading the file" })
      }
      const file = req.file as CustomFile
      const videoKey = file.key

      const { title, description } = req.body

      if (title === "") {
        return res.status(400).json({ errors: "chapter title cannot be empty" })
      }

      const content = new Contents({
        title,
        description,
        videoURL: videoKey,
        contentChapter,
      })

      await AppDataSource.manager.save(content)

      res.status(200).json({ content: content })
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      errors: "something went wrong while creating content, please try again",
    })
  }
}

// GETTING COURSE CHAPTER CONTENT

const getChapterContent = async (req: Request, res: Response) => {
  const chapterId = req.params.id
  try {
    const courseRepository = AppDataSource.getRepository(Chapters)
    const contents = await courseRepository.findOne({
      where: { id: chapterId },
      relations: ["content"],
    })

    if (!contents) {
      return res.status(400).json({ errors: "course details not found" })
    }

    res.status(200).json({ chapter: contents })
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ errors: "failed to retrive course details" })
  }
}

export { getVideoContent, createContent, getChapterContent }
