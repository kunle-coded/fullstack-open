import { useEffect, useState } from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const votesArr = new Array(anecdotes.length + 1)
    .join("0")
    .split("")
    .map(parseFloat);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesArr);
  const [highestVote, setHighestVote] = useState(0);

  function handleRandom() {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  }

  function handleVote() {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  useEffect(() => {
    const highestVote = Math.max(...votes);
    const indexOfHighestVote = votes.indexOf(highestVote);
    setHighestVote(indexOfHighestVote);
  }, [votes]);

  return (
    <div>
      <div>
        <h2>Anectdote of the day</h2>
        {anecdotes[selected]}
        <p>has {votes[selected]} votes</p>
      </div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleRandom}>next anecdote</button>
      </div>
      <div>
        <h2>Anectdote with most votes</h2>
        {anecdotes[highestVote]}
      </div>
    </div>
  );
}

export default App;
