import express from "express";
import diaryRouter from "./routes/diaries";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/diaries", diaryRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
