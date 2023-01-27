import express from "express";
import  routes  from "./routes/index";
//  import pug from "pug";

const app = express();
const port = 3000 ;
app.set("view engine", "pug");
app.use("/", routes);


//  listen to port
app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
