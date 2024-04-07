import {
  Gender,
  NewPatientEntry,
  Entry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
  Leave,
  Hospital,
  BaseEntry,
} from "./types";

// Validation and parsing for name and occupation
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    const strValue =
      text === "name"
        ? "name"
        : text === "ssn"
        ? "ssn"
        : text === "occupation"
        ? "occupation"
        : "input";
    throw new Error(`Incorrect or missing ${strValue}`);
  }

  return text;
};

// Validation and parsing for date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// Validation and parsing for gender
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing weather: " + gender);
  }
  return gender;
};

// Validation and parsing for entry

const isHospitalEntry = (entry: unknown): entry is HospitalEntry => {
  if (!entry || typeof entry !== "object") {
    return false;
  }
  return true;
};

const isOccupationalHealthcareEntry = (
  entry: unknown
): entry is OccupationalHealthcareEntry => {
  if (!entry || typeof entry !== "object") {
    return false;
  }
  return true;
};

const isHealthCheckEntry = (entry: unknown): entry is HealthCheckEntry => {
  if (!entry || typeof entry !== "object") {
    return false;
  }
  return true;
};

const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  const validTypes: Array<string> = [
    "Hospital",
    "OccupationalHealthcare",
    "HealthCheck",
  ];
  const type = (entry as { type: string }).type;
  if (!validTypes.includes(type)) {
    return false;
  }

  switch (type) {
    case "Hospital":
      return isHospitalEntry(entry);
    case "OccupationalHealthcare":
      return isOccupationalHealthcareEntry(entry);
    case "HealthCheck":
      return isHealthCheckEntry(entry);
    default:
      return false;
  }
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!Array.isArray(entries) || !entries.every(isEntry)) {
    throw new Error("Incorrect or missing entries: " + entries);
  }
  return entries;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return object as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!Object.values(HealthCheckRating).includes(rating as HealthCheckRating)) {
    throw new Error("Incorrect or missing health check rating");
  }
  return rating as HealthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): Leave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing sick leave data");
  }

  const startDate = parseDate((sickLeave as Leave).startDate);
  const endDate = parseDate((sickLeave as Leave).endDate);

  return {
    startDate,
    endDate,
  };
};

const parseDischarge = (discharge: unknown): Hospital => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge data");
  }

  const date = parseDate((discharge as Hospital).date);
  const criteria = parseString((discharge as Hospital).criteria);

  return {
    date,
    criteria,
  };
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toAddNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "date" in object &&
    "specialist" in object &&
    "description" in object &&
    "diagnosisCodes" in object
  ) {
    const baseEntry: Omit<BaseEntry, "id"> = {
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      const healthCheckEntry: HealthCheckEntry = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return healthCheckEntry;
    } else if (object.type === "Hospital" && "discharge" in object) {
      const hospitalEntry: HospitalEntry = {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
      return hospitalEntry;
    } else if (
      object.type === "OccupationalHealthcare" &&
      "employerName" in object &&
      "sickLeave" in object
    ) {
      const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
      return occupationalHealthcareEntry;
    } else {
      throw new Error("Unknown entry type");
    }
  } else {
    throw new Error("Missing entry type");
  }
};

export default toNewPatientEntry;
