import express from "express";
import imageProcessing from "./api/image-processing";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("main api route");
});

routes.use("/image-processing", imageProcessing);

export default routes;
