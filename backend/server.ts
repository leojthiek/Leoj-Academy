import express from "express"
import userRoute from "./routes/userRoutes"
import trim from "./middleware/trim"


const app = express()

app.use(express.json())
app.use(trim)

app.get("/", (req, res) => {
  res.send("hello server")
})
app.use("/api/users", userRoute)

app.listen(5000, () => console.log("server is running on port 5000"))


