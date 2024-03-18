import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteSlice";

import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

function App() {
  const [isAdd, setIsAdd] = useState(false);

  const isNotification = useSelector(
    (state) => state.notification.isNotification
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch, isNotification]);

  return (
    <div>
      <h2>Anecdotes</h2>

      <Notification />

      <Filter />

      <AnecdoteList />

      <div>
        {isAdd ? (
          <button onClick={() => setIsAdd(false)}>Cancel</button>
        ) : (
          <button onClick={() => setIsAdd(true)}>Add new</button>
        )}

        {isAdd ? <AnecdoteForm /> : null}
      </div>
    </div>
  );
}

export default App;
