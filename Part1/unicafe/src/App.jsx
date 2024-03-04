import { useState } from "react";

function Statistics(props) {
  if (props.good + props.neutral + props.bad === 0)
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given yet</p>
      </div>
    );

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />

        <StatisticLine
          text="all"
          value={props.good + props.neutral + props.bad}
        />
        <StatisticLine
          text="average"
          value={
            props.good + props.neutral + props.bad === 0
              ? 0
              : (props.good - props.bad) /
                (props.good + props.neutral + props.bad)
          }
        />
        <StatisticLine
          text="positive"
          value={
            props.good + props.neutral + props.bad === 0
              ? 0
              : (props.good / (props.good + props.neutral + props.bad)) * 100
          }
        />
      </tbody>
    </table>
  );
}

function Button(props) {
  return <button onClick={props.onClick}>{props.text}</button>;
}

function StatisticLine(props) {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value}
        {props.text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleGood() {
    setGood(good + 1);
  }

  function handleNeutral() {
    setNeutral(neutral + 1);
  }

  function handleBad() {
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>Give feedback</h2>

      <div>
        <Button text="good" onClick={handleGood} />
        <Button text="neutral" onClick={handleNeutral} />
        <Button text="bad" onClick={handleBad} />
      </div>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
