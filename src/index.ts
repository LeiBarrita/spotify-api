import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Api");
});

app.listen(port, () => {
  console.log(`Server is running in port http://localhost:${port}`);
});
