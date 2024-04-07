import patientsData from "../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatientData,
  Patient,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitiveData = (): NonSensitivePatientData[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getSinglePatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);

  if (patient) {
    return patient;
  }

  return undefined;
};

const addPatient = (data: NewPatientEntry): Patient => {
  const id: string = uuid();

  const newObj = {
    id,
    ...data,
  };

  patients.push(newObj);
  return newObj;
};

const addEntry = (data: EntryWithoutId, patientId: string): Entry => {
  const id: string = uuid();

  const newObj = {
    id,
    ...data,
  };

  const patient = patients.find((patientD) => patientD.id === patientId);

  if (patient) {
    patient.entries.push(newObj);
  }
  return newObj;
};

export default {
  getPatients,
  getNonSensitiveData,
  addPatient,
  getSinglePatient,
  addEntry,
};
