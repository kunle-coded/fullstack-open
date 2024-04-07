// import { useState } from "react";
import { useEffect, useState } from "react";
import diaryService from "./diaryService";
import { Diary, NewDiary } from "./types";
import DiaryItem from "./components/DiaryItem";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };

    void fetchDiaries();
  }, []);

  const onAddDiary = async (diaryObj: NewDiary) => {
    const diary = await diaryService.addDiary(diaryObj);

    setDiaries(diaries.concat(diary));
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <DiaryForm onSubmit={onAddDiary} />

      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diary={diary} />
      ))}
    </div>
  );
}

export default App;
