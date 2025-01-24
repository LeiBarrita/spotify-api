import express, { Express } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app: Express = express();

app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);

export default app;
