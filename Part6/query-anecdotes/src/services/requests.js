import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = async (content) => {
  try {
    const response = await axios.post(baseUrl, content);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error while creating anecdote:", error);
    throw error; //
  }
};

export const voteAnecdote = async (id) => {
  const res = axios.get(`${baseUrl}/${id}`).then((res) => res.data);
  const toVote = await res;
  const content = { ...toVote, votes: toVote.votes + 1 };

  return axios.put(`${baseUrl}/${id}`, content).then((res) => res.data);
};
