import { useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteSlice";
import { setNotification } from "../reducers/notificationSlice";

function Anecdote({ anecdote }) {
  const dispatch = useDispatch();

  function handleVote() {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5000));
  }

  if (anecdote === null) return null;

  return (
    <li>
      <div>{anecdote.content}</div>
      <div className="vote">
        has {anecdote.votes} <button onClick={handleVote}>vote</button>
      </div>
    </li>
  );
}

export default Anecdote;
