import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry, { toAddNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveData());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getSinglePatient(req.params.id));
});

router.post("/", (req, res) => {
  const newPatient = toNewPatientEntry(req.body);

  const addedPatient = patientService.addPatient(newPatient);
  res.send(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toAddNewEntry(req.body);

    const id = req.params.id;

    if (newEntry) {
      const addedEntry = patientService.addEntry(newEntry, id);

      res.send(addedEntry);
    } else {
      throw new Error("New entry is not valid");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred" });
    }
  }
});

export default router;
