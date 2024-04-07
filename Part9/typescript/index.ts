import express from "express";
import calculateBmi from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query || !req.query.height || !req.query.weight) {
    res.json({
      error: "malformatted parameters",
    });
    return;
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(weight, height);

  const result = {
    weight,
    height,
    bmi,
  };
  res.json(result);
});

app.post("/exercises", (req, res) => {
  if (!req.body || !req.body.daily_exercises || !req.body.target) {
    res.json({
      error: "parameters missing",
    });

    return;
  }

  const { daily_exercises, target } = req.body;

  if (
    !daily_exercises.every(
      (value: any) => typeof value === "number" && !isNaN(value)
    ) ||
    typeof target !== "number" ||
    isNaN(target)
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = exerciseCalculator(daily_exercises, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
