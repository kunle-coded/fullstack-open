const calculateBmi = (weight: number, height: number): string => {
  if (height <= 0) return "Cannot divide by 0!";

  const meters = height / 100;
  const bmi = Math.floor((weight / (meters * meters)) * 100) / 100;

  if (bmi <= 18.4) {
    return "Underweight (Unhealthy)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (Healthy)";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight (At Risk)";
  } else if (bmi >= 30) {
    return "Overweight (Obese)";
  } else {
    return "Enter valid height and weight values";
  }
};

// const w: number = Number(process.argv[2]);
// const h: number = Number(process.argv[3]);

// calculateBmi(w, h);

export default calculateBmi;
