import sharp from "sharp";
// import { existsSync, writeFileSync } from "fs";
import  * as fs from "fs";
import { basename } from "path";

interface ImageResponse {
image: string;
}

interface ErrorResponse {
error: string;
}

const resizeAndSaveImage = async (
filename: string,// a string that contains the path to the image
width: number,
height: number
): Promise<ImageResponse | ErrorResponse> => {
try {
// check if image with the given filename exists in the assets/images/full folder
const imagePath: string = filename;
if (!fs.existsSync(imagePath)) {
return { error: "image not found" };
}

const thumbPath: string = `assets/images/thumb/${width}x${height}_${basename(filename)}`;
console.log(thumbPath);
if (fs.existsSync(thumbPath)) {
  console.log("image already exists");
  return { image: thumbPath };
} else {
  // resize image using sharp
  const resizedImage: Buffer = await (sharp(imagePath)
    .resize(width, height)
    .toBuffer());

  // write resized image to the thumb folder
  fs.writeFileSync(thumbPath, resizedImage);
  return { image: thumbPath };
}
} catch (err) {
  console.error(err);
  return { error: "error while resizing image" };
  }
  };

  export default resizeAndSaveImage;