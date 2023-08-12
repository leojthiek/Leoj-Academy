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

const allowedOrigin = ['https://leoj-academy.netlify.app','http://localhost:3000']
app.use(cors({
  origin:allowedOrigin
}))



cloudinary.config({
  cloud_name:config.cloudinary_cloud_name,
  api_key:config.cloudinary_api_key,
  api_secret:config.cloudinary_api_secret
})


// initialised data source if not initialised 
initializeDataSource().then(()=>{
  app.get("/", (req, res) => {
    res.send("hello server")
  })
  app.use("/api/users", userRoute)
  app.use("/api/courses", courseRoute)
  app.use('/api/content',contentRoute)
  
  app.listen(config.port, () => console.log(`server is running on ${config.port}`))
  
}).catch((error)=>{
  console.log('data source initialized error',error)
  process.exit(1)
})
