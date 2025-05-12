import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { router as userRouter } from "./routes/users";
import { router as carRouter } from "./routes/cars";
import { notFound, errorHandler } from "./common/middlewares";

const app = express();

app.use(json());

app.get("/", (req, res) => {
  res.send("API is running.");
});

app.use(cors());
app.use("/users", userRouter);
app.use("/cars", carRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});