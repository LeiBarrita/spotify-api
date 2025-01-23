import express, { Express } from "express";
import authRoutes from "./routes/auth.routes";

const app: Express = express();

app.use(express.json());
app.use(authRoutes);

export default app;
