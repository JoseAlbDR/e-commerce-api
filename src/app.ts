import "express-async-errors";
import "dotenv/config";
import express from "express";
import dbConnect from "./db/connect";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import productsRouter from "./routes/productRoutes";
import reviewsRouter from "./routes/reviewRoutes";
import orderRouter from "./routes/orderRoutes";

import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./src/public"));
app.use(fileUpload());

app.get("/", (_req, res) => {
  res.send("E-Commerce API");
});

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("E-Commerce API");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/orders", orderRouter);

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
