import express, { Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void => {
    cb(null, "assets/images/full");
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const uploadRouter = express.Router();

uploadRouter.post("/api/images/upload", upload.single("image"), (req: Request, res: Response): void => {
  if(req.file != null){
    try {
      const file = req.file ;
      res.render("home", { message: `Image ${file.originalname} successfully uploaded` });
    } catch (error) {
      console.error(error);
      res.render("home", { message: error });
    }
  }else{
    res.render("home", { message: "please upload image" });
  }
});

export default uploadRouter;
