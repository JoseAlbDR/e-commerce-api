import "express-async-errors";
import "dotenv/config";
import express from "express";
import dbConnect from "./db/connect";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import authRouter from "./routes/authRoutes";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("E-Commerce API");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  await dbConnect();
  console.log("Successfully connected to database");
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
};

void start();
