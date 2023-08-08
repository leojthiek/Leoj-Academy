import multer from 'multer'
import multerS3 from 'multer-s3'
import AWS from 'aws-sdk'
import config from '../config/dotenvConfig'
import { S3Client } from '@aws-sdk/client-s3'


const s3client = new S3Client({
    region: config.region,
    credentials: {
      accessKeyId: config.aws_access_key,
      secretAccessKey: config.aws_secret_key,
    },
  })

 export const upload = multer({
    storage:multerS3({
        s3:s3client,
        bucket:'leojacademy-video',
        contentType:multerS3.AUTO_CONTENT_TYPE,
        key:function(req,file,cb){
            const videoKey = Date.now()+file.originalname
            cb(null,videoKey)
        }

    })
})
