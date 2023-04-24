# Udacity Image Processing API

This is a simple API that allows you to resize and process images using the **[Sharp](https://sharp.pixelplumbing.com)** image processing library.

## Requirements

- Node.js version 12.x or later
- NPM or Yarn package manager

## Installation

1. Clone the repository: `git clone https://github.com/ptums/udacity-processing-image-api.git`
2. Install the dependencies: `npm install` or `yarn install`
3. Start the server: `npm start` or `yarn start`
4. Open your browser and navigate to `http://localhost:3000/api/image-processing?width=500&height=500&fileName=test.jpg`

### API Usage

The API provides a single endpoint `/api/image-processing` that takes the following query parameters:

`width` (required): The width of the resized image in pixels.
`height` (required): The height of the resized image in pixels.
`fileName` (required): The name of the image file to resize, located in the images directory of the project.

If the parameters are valid and the image file exists, the API will resize the image and return it as a JPEG. The resized image is also saved to the `images/resized-images` directory for future use.

## Testing

This project includes unit tests written with the Jasmine testing framework. To run the tests, use the command: `npm run test` .

The tests are located in the `src/tests` directory and cover the main functionality of the API, including image resizing, caching, and error handling.

## Development

To run the development server, use the command: `npm run start`.

To run the linter and formatter, use the command: `npm run lint` and `npm run format`. This project uses ESLint and Prettier to enforce code style and formatting.
