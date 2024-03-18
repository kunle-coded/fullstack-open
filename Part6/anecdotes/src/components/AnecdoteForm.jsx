import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteSlice";

function AnecdoteForm() {
  const dispatch = useDispatch();

  async function handleNew(event) {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (!content) return;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
  }

  return (
    <form onSubmit={handleNew}>
      <label htmlFor="anecdote">Anecdote</label>
      <input type="text" name="anecdote" />
      <button>Add</button>
    </form>
  );
}

export default AnecdoteForm;
