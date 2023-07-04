import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { Request, Response } from "express"

import config from "../config/dotenvConfig"

const s3client = new S3Client({
  region: config.region,
  credentials: {
    accessKeyId: config.aws_access_key,
    secretAccessKey: config.aws_secret_key,
  },
})

// @GET VIDEO FOR SPECIFIC CONTENT

const getVideoContent = async (req: Request, res: Response) => {
  try {
    const { bucketName, keyName } = req.query

    if (!keyName || !bucketName) {
      return res
        .status(400)
        .json({ errors: "No video found for the specific key or bucket" })
    }

    const command = new GetObjectCommand({
      Bucket: "leojacademy-video",
      Key: keyName.toString(),
    })

    const signedUrl = await getSignedUrl(s3client, command, { expiresIn: 3600 })

    res.status(200).json({ url: signedUrl })
  } catch (error) {
    console.error("Error generating signed URL for video:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export  {getVideoContent}
