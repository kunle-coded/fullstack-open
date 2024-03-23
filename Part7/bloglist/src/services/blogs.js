import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

let token = null;
function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

const login = async (formData) => {
  const request = await axios.post('/api/login', formData);

  return request.data;
};

const create = async (content) => {
  const config = {
    headers: { Authorization: `Bearer ${content.rights}` },
  };

  const response = await axios.post(baseUrl, content.content, config);
  return response.data;
};

const update = async (value) => {
  const config = {
    headers: { Authorization: `Bearer ${value.rights}` },
  };

  const response = await axios.put(
    `${baseUrl}/${value.content.id}`,
    value.content,
    config,
  );
  return response.data;
};

const comment = async (value) => {
  const config = {
    headers: { Authorization: `Bearer ${value.rights}` },
  };

  const response = await axios.put(
    `${baseUrl}/${value.content.id}/comments`,
    value.content,
    config,
  );
  return response.data;
};

const edit = async (value) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${value.id}`, value, config);
  return response.data;
};

const remove = async (value) => {
  const config = {
    headers: { Authorization: `Bearer ${value.rights}` },
  };

  const response = await axios.delete(`${baseUrl}/${value.content.id}`, config);
  return response.data;
};

export default {
  getAll,
  login,
  setToken,
  create,
  update,
  remove,
  edit,
  comment,
};
