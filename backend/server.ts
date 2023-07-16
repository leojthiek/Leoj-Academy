import express from "express";
import trim from "./middleware/trim";
import cors from "cors";
import initializeDataSource from "./utils/inititialisedDataSource";
import courseRoute from "./routes/courseRoute";
import userRoute from "./routes/userRoutes";
import contentRoute from "./routes/contentRoutes";

const app = express();

app.use(express.json());
app.use(trim);
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello server");
});

// Initialize the data source before starting the server
initializeDataSource()
  .then(() => {
    app.use("/api/users", userRoute);
    app.use("/api/courses", courseRoute);
    app.use("/api/content", contentRoute);

    app.listen(5000, () => console.log("server is running on port 5000"));
  })
  .catch((error) => {
    console.error("Failed to initialize data source:", error);
    process.exit(1); // Terminate the server process if the data source fails to initialize
  });
