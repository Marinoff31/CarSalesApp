import express from "express";
import { json } from "body-parser";
import { router as userRouter } from "./routes/users";
import { router as carRouter } from "./routes/cars";

const app = express();

app.use(json());
app.use("/users", userRouter);
app.use("/cars", carRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});