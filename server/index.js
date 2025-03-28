import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import postRoutes from "./routes/post.route.js";
import imageioRoutes from "./routes/imageio.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/imageio", imageioRoutes);

app.get("/", async (req, res) => {
  res.send("hello from image.io");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port https://image-io-tdc9.onrender.com")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
