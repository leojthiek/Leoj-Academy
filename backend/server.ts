import express from "express"
import trim from "./middleware/trim"
import cors from 'cors'

import initializeDataSource from "./utils/inititialisedDataSource"
import courseRoute from "./routes/courseRoute"
import userRoute from "./routes/userRoutes"
import contentRoute from './routes/contentRoutes'

const app = express()


app.use(express.json())
app.use(trim)
app.use(cors())


initializeDataSource().then(()=>{
  app.get("/", (req, res) => {
    res.send("hello server")
  })
  app.use("/api/users", userRoute)
  app.use("/api/courses", courseRoute)
  app.use('/api/content',contentRoute)
  
  app.listen(5000, () => console.log("server is running on port 5000"))
  
}).catch((error)=>{
  console.log('data source initialized error',error)
  process.exit(1)
})
