import express from "express";
import { UserModel } from "../models";

export const router = express.Router();

router.post("/", async (req, res) => {
  const result = await UserModel.create(req.body);
  res.json(result);
});

router.get("/", async (req, res) => {
  const users = await UserModel.getAll();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await UserModel.getById(Number(req.params.id));
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const result = await UserModel.update(Number(req.params.id), req.body);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await UserModel.delete(Number(req.params.id));
  res.json(result);
});
