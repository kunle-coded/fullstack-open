interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (
  hours: number[],
  targetHr: number
): result => {
  let trainDays = 0;
  hours.forEach((hour) => {
    if (hour > 0) {
      trainDays++;
    }
  });
  const totalHrs = hours.reduce((a, b) => {
    return (a += b);
  });

  const averageTrain = totalHrs / hours.length;

  const rate =
    averageTrain === targetHr ? 3 : averageTrain > targetHr / 2 ? 2 : 1;

  const resultObj = {
    periodLength: hours.length,
    trainingDays: trainDays,
    success: averageTrain === targetHr ? true : false,
    rating: rate,
    ratingDescription:
      rate === 3
        ? "excellent"
        : rate === 2
        ? "not too bad but could be better"
        : "poor",
    target: targetHr,
    average: averageTrain,
  };

  return resultObj;
};

// const args = process.argv.slice(2);
// const hoursArr: number[] = args[0]?.split(",").map(Number) || [];
// const target: number = Number(args[1]) || 0;

// exerciseCalculator(hoursArr, target);
