import express from "express"
import trim from "./middleware/trim"
import cors from 'cors'
import {v2 as cloudinary} from 'cloudinary'

import initializeDataSource from "./utils/inititialisedDataSource"
import courseRoute from "./routes/courseRoute"
import userRoute from "./routes/userRoutes"
import contentRoute from './routes/contentRoutes'
import config from "./config/dotenvConfig"

const app = express()


app.use(express.json({limit:'50mb'}))
app.use(trim)
app.use(cors())


cloudinary.config({
  cloud_name:config.cloudinary_cloud_name,
  api_key:config.cloudinary_api_key,
  api_secret:config.cloudinary_api_secret
})



initializeDataSource().then(()=>{
  app.get("/", (req, res) => {
    res.send("hello server")
  })
  app.use("/api/users", userRoute)
  app.use("/api/courses", courseRoute)
  app.use('/api/content',contentRoute)
  
  app.listen(config.port || 5001, () => console.log(`server is running on ${config.port || "5001"}`))
  
}).catch((error)=>{
  console.log('data source initialized error',error)
  process.exit(1)
})
