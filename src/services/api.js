import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTask = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  console.log(response)
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
