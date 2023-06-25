import express from "express"
import trim from "./middleware/trim"


import courseRoute from './routes/courseRoute'
import userRoute from "./routes/userRoutes"



const app = express()

app.use(express.json())
app.use(trim)

app.get("/", (req, res) => {
  res.send("hello server")
})
app.use("/api/users", userRoute)
app.use("/api/courses", courseRoute)


app.listen(5000, () => console.log("server is running on port 5000"))


