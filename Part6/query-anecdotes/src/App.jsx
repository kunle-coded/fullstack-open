import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useContext } from "react";
import NotificationContext from "./NotificationContext";

import { getAnecdotes, voteAnecdote } from "./services/requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 2,
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    const { id } = anecdote;
    voteAnecdoteMutation.mutate(id);
    dispatch({
      type: "NEW_NOTIFICATION",
      payload: `anecdote '${anecdote.content}' voted`,
    });

    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
