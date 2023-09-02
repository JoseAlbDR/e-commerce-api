import "express-async-errors";
import "dotenv/config";
import express from "express";
import dbConnect from "./db/connect";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

const app = express();
const port = process.env.PORT || 3000;

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.get("/", (_req, res) => {
  res.send("E-Commerce API");
});

const start = async () => {
  await dbConnect();
  console.log("Successfully connected to database");
  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
};

void start();
