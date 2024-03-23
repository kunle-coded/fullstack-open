import { Link } from "react-router-dom";

function AnecdoteList({ anecdotes }) {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        {anecdotes.map((anecdote) => (
          <Link to={`/anecdotes/${anecdote.id}`} key={anecdote.id}>
            {anecdote.content}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default AnecdoteList;
