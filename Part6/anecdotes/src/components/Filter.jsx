import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterSlice";

function Filter() {
  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch(filterChange(event.target.value));
  }

  return (
    <div style={{ marginBottom: 10 }}>
      Filter <input type="text" onChange={handleChange} />
    </div>
  );
}

export default Filter;
