import express from "express";
import { CarModel } from "../models";

export const router = express.Router();

router.post("/", async (req, res) => {
  const result = await CarModel.create(req.body);
  res.json(result);
});

router.get("/", async (req, res) => {
  const cars = await CarModel.filter(req.query);
  res.json(cars);
});

router.get("/:id", async (req, res) => {
  const car = await CarModel.getById(Number(req.params.id));
  res.json(car);
});

router.put("/:id", async (req, res) => {
  const result = await CarModel.update(Number(req.params.id), req.body);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await CarModel.delete(Number(req.params.id));
  res.json(result);
});
