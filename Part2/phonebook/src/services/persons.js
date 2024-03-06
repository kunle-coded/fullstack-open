/* eslint-disable no-unused-vars */
import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
}

function create(newObject) {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
}

function deletePerson(id) {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
}

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
}

export default { getAll, create, deletePerson, update };
