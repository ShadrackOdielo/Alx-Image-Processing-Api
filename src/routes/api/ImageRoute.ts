import express, { Request, Response } from "express";
import resizeAndSaveImage from "../../resizer";
import * as fs from "fs";
import path from "path";

const imageRoute = express.Router();
const imageFolder = "assets/images/full";
imageRoute.use('/api/images', express.static("assets/images/"));




imageRoute.get("/api/images", (req: Request, res: Response): void => {
  interface ImageQuery {
    filename?: string;
    height?: string ;
    width?: string ;
}
  const { filename, height, width } :ImageQuery = req.query as ImageQuery;
 

  
  if ( (filename == null) && (height == null) && (width == null) ) {
    // Get all file names in the image folder
    fs.readdir(imageFolder, (err, files) => {
      if (err != null) {
        res.status(500).send("Error reading image folder");
        return;
      }

      // Render the index pug file with the list of file names
      res.render("index", { files });
    });
  } else if ((filename != null) && ((height == null) || (width == null))) {
    // Check if the file exists in the image folder
    const filePath = path.join(imageFolder, filename );
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err != null) {
        res.status(404).render("error", { error: "No matching image" });
      }
      const fullpic = path.parse(filePath );
      // Send the file as a response
      res.render("fullimage", {image: "full/" + path.basename(fullpic.base)});
      console.log("now seeing: " + fullpic.base);
    });
  } else if ( (filename != null) && (height != null) && (width != null)) {
    // Check if the file exists in the image folder
    const filePath = path.join(imageFolder, filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err != null) {
        res.status(404).render("error", { error: "No matching image" });
        return;
      }
      const heightInt = parseInt(height );
      const widthInt = parseInt(width );

      // Check if the height and width are valid positive integers
      if (
        isNaN(heightInt) ||
        isNaN(widthInt) ||
        heightInt <= 0 ||
        widthInt <= 0
      ) {
        res.status(400).render('error',{error:"Invalid height or width"});
      }

      // Pass the file, height, and width to the resizeAndSaveImage function
      resizeAndSaveImage(filePath, widthInt, heightInt)
        .then((image) => {
          // Check if the resizeAndSaveImage function returned an error
          if ('error' in image) {
            res.render("error", { error: image.error });
          } else {
            const pic = path.parse(image.image);
            // Send the file as a response
            res.render("image", {image: "thumb/" + path.basename(pic.base)});
            console.log("now seeing: " + pic.base);
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error resizing image");
        }
        );
    });
  } else {

    res.status(400).render("error", { error: "Invalid query" });
  }
});

export default imageRoute;
