import axios from "axios";
import { Diary, NewDiary } from "./types";

const baseUrl = "http://localhost:3003/api/diaries";

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(baseUrl);

  return data;
};

const addDiary = async (diaryData: NewDiary) => {
  const { data } = await axios.post(baseUrl, diaryData);
  return data;
};

export default { getAll, addDiary };
