import data from "../data";

const initialState = {
  anecdotes: data,
};

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE": {
      const newAnec = {
        anecdote: action.payload,
        id: state.anecdotes.length,
        vote: 0,
      };
      return { ...state, anecdotes: state.anecdotes.concat(newAnec) };
    }
    case "VOTE": {
      const updated = state.anecdotes.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, vote: anecdote.vote + 1 }
          : anecdote
      );
      return { ...state, anecdotes: updated };
    }

    default:
      return state;
  }
};

export const createAnecdote = (payload) => {
  return {
    type: "NEW_ANECDOTE",
    payload,
  };
};
export const voteAnecdote = (payload) => {
  return {
    type: "VOTE",
    payload,
  };
};

export default anecdoteReducer;
