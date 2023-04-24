import app from "../index"; // Assuming your app is defined in a separate file called app.ts
import fs from "fs";
import path from "path";
import sharp from "sharp";
import supertest from "supertest";

const request = supertest(app);

describe("image-processing endpoint", () => {
  const testFile = "icelandwaterfall";
  const imagePath = path.join(__dirname, "../../images", `${testFile}.jpg`);

  const resizedImagePath = path.join(
    __dirname,
    "../../images/resized-images",
    `${testFile}-test.jpg`
  );

  const apiEndpoint = "/api/image-processing";

  beforeEach(() => {
    const testImageBuffer = fs.readFileSync(imagePath);
    fs.writeFileSync(resizedImagePath, testImageBuffer);
  });

  afterEach(() => {
    if (fs.existsSync(resizedImagePath)) {
      fs.unlinkSync(resizedImagePath);
    }
  });

  it("should send a 400 if parameters are missing", async () => {
    const response = await request.get(apiEndpoint);
    expect(response.status).toEqual(400);
  });

  it("should resize the image", async () => {
    const response = await request
      .get(apiEndpoint)
      .query({ width: "200", height: "200", fileName: `${testFile}.jpg` });

    expect(response.status).toEqual(200);
    expect(fs.existsSync(resizedImagePath)).toBeTrue();
  });

  it("should send the existing resized image", async () => {
    const testImageBuffer = fs.readFileSync(imagePath);
    const resizedImageBuffer = await sharp(testImageBuffer)
      .resize(200, 200)
      .toBuffer();
    fs.writeFileSync(resizedImagePath, resizedImageBuffer);

    const response = await request
      .get(apiEndpoint)
      .query({ width: "200", height: "200", fileName: `${testFile}.jpg` });

    expect(response.status).toEqual(200);
    expect(fs.readFileSync(resizedImagePath)).toEqual(resizedImageBuffer);
  });
});
