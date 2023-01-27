import express,{Request,Response, Router} from "express";

const homeRoute: Router  = express.Router();

homeRoute.get("/api", (req: Request, res: Response): void => {
  res.render("home", { title: "Homepage" });
});

homeRoute.get("/", (req: Request, res: Response): void => {
  res.render("home", { title: "Homepage" });
});

export default homeRoute;
