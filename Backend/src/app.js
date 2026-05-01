import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import bachatRoutes from "./routes/bachat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bachats", bachatRoutes);

app.use(errorHandler);

export default app;
