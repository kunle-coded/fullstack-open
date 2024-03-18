import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

function AnecdoteList() {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === ""
      ? anecdotes
      : anecdotes.map((anecdote) =>
          anecdote.anecdote.includes(filter) ? anecdote : null
        );
  });

  return (
    <ul>
      {anecdotes.map((anecdote, index) => (
        <Anecdote key={index} anecdote={anecdote} />
      ))}
    </ul>
  );
}

export default AnecdoteList;
