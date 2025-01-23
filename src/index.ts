import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;

async function start() {
  try {
    app.listen(port, () => {
      console.log(`Server is running in port http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

start();
