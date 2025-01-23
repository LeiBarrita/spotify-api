import express, { Express } from "express";
import testRoutes from "./routes/test.routes";

const app: Express = express();

app.use(express.json());
app.use(testRoutes);

export default app;
