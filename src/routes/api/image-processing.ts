import express, { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const imageProcessing = express.Router();

const missingParamsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { width, height, fileName } = req.query as {
    width: string;
    height: string;
    fileName: string;
  };

  if (!width || !height || !fileName) {
    return res.status(400).send("Missing required parameters");
  }

  next();
};

const imageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { width, height, fileName } = req.query as {
    width: string;
    height: string;
    fileName: string;
  };

  const [name, extension] = fileName.split(".");

  const resizedImagePath = path.join(
    __dirname,
    "../../../images/resized-images",
    `${name}-${width}x${height}.${extension}`
  );

  if (fs.existsSync(resizedImagePath)) {
    // If it exists, send the image directly to the response
    return res.sendFile(resizedImagePath);
  }

  next();
};
imageProcessing.get(
  "/",
  [missingParamsMiddleware, imageMiddleware],
  async (req: Request, res: Response) => {
    const { width, height, fileName } = req.query as {
      width: string;
      height: string;
      fileName: string;
    };
    try {
      const imagePath = path.join(__dirname, "../../../images", fileName);
      const [name, extension] = fileName.split(".");

      const resizedImageBuffer = await sharp(imagePath)
        .resize(parseInt(width.toString()), parseInt(height.toString()))
        .toBuffer();

      const resizedImagePath = path.join(
        __dirname,
        "../../../images/resized-images",
        `${name}-${width}x${height}.${extension}`
      );

      // Send the resized image directly to the response
      res.set("Content-Type", "image/jpeg");
      res.status(200).send(resizedImageBuffer);

      // Write the resized image to disk
      fs.writeFile(resizedImagePath, resizedImageBuffer, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Failed to resize image");
    }
  }
);

export default imageProcessing;
