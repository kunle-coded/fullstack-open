import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

import { createAnecdote } from "../services/requests";

const AnecdoteForm = () => {
  const [_, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });

      // For performance when dealing with large data, manually updating the frontend
      // const anecdotes = queryClient.getQueryData(["anecdotes"]);
      // queryClient.setQueryData(["notes"], notes.concat(anecdotes));
    },
    onError: (error) => {
      const notiErr = error.response.data.error;
      dispatch({
        type: "NEW_NOTIFICATION",
        payload: notiErr,
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });

    dispatch({
      type: "NEW_NOTIFICATION",
      payload: `anecdote '${content}' added`,
    });

    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
