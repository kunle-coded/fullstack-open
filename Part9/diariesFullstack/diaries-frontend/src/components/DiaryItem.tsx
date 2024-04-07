import { Diary } from "../types";

interface DiaryProps {
  diary: Diary;
}

const DiaryItem = ({ diary }: DiaryProps) => {
  return (
    <div style={{ marginTop: 35 }}>
      <h3>{diary.date}</h3>
      <p>Visibility: {diary.visibility}</p>
      <p>Weather: {diary.weather}</p>
    </div>
  );
};

export default DiaryItem;
