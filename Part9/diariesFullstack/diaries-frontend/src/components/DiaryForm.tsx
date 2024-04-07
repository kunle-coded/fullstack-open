import { ChangeEvent, SyntheticEvent, useState } from "react";
import { NewDiary, Visibility, Weather } from "../types";

interface Props {
  onSubmit: (values: NewDiary) => void;
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [comment, setComment] = useState("");

  const handleVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility);
  };

  const handleWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };

  const onAdd = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({ date, visibility, weather, comment });
    clearInputs();
  };

  const clearInputs = () => {
    setDate("");
    setComment("");
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
  };

  return (
    <div>
      <form onSubmit={onAdd}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <br />
        <div>
          Visibility
          <input
            type="radio"
            value={Visibility.Great}
            checked={visibility === Visibility.Great}
            name="visibility"
            onChange={handleVisibilityChange}
          />
          <label htmlFor="great">great</label>
          <input
            type="radio"
            value={Visibility.Good}
            name="visibility"
            checked={visibility === Visibility.Good}
            onChange={handleVisibilityChange}
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            value={Visibility.Ok}
            name="visibility"
            checked={visibility === Visibility.Ok}
            onChange={handleVisibilityChange}
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            value={Visibility.Poor}
            name="visibility"
            checked={visibility === Visibility.Poor}
            onChange={handleVisibilityChange}
          />
          <label htmlFor="poor">poor</label>
        </div>
        <br />
        <div>
          Weather
          <input
            type="radio"
            value={Weather.Sunny}
            checked={weather === Weather.Sunny}
            name="weather"
            onChange={handleWeatherChange}
          />
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            value={Weather.Rainy}
            name="weather"
            checked={weather === Weather.Rainy}
            onChange={handleWeatherChange}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            value={Weather.Cloudy}
            name="weather"
            checked={weather === Weather.Cloudy}
            onChange={handleWeatherChange}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            value={Weather.Stormy}
            name="weather"
            checked={weather === Weather.Stormy}
            onChange={handleWeatherChange}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            type="radio"
            value={Weather.Windy}
            name="weather"
            checked={weather === Weather.Windy}
            onChange={handleWeatherChange}
          />
          <label htmlFor="windy">windy</label>
        </div>
        <br />
        <div>
          <label htmlFor="Comment">Comment</label>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
