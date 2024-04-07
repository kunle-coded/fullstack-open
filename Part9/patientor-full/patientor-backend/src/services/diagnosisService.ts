import diagnosisData from "../data/diagnoses";
import { Diagnosis } from "../types";

const diagnosis: Diagnosis[] = diagnosisData;

const getDiagnosis = (): Diagnosis[] => {
  return diagnosis;
};

export default { getDiagnosis };
