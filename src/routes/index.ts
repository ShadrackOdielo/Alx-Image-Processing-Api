import express, { Request, Response } from "express";
import homeRoute from "./api/homeRoutes";
import imageRoute from "./api/ImageRoute";
import uploadRoute from "./api/uploadRoute";

const routes = express.Router();

routes.use(homeRoute);
routes.use(imageRoute);
routes.use(uploadRoute);

routes.use((_req: Request, res: Response) =>{
  console.log("redirecting to home");
  res.redirect("/");
});

export default routes;
