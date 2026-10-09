import axios from "axios";

//everything in this file know one thing: how to talk to our server
//there is no react here at all
const BASE = "http://localhost:3001";

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE}/todos`);
  return response.data;
};

export const createTodo = async (title) => {
  const response = await axios.post(`${BASE}/todos`, { title, done: false });
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE}/todos/${id}`);
};

export const updateTodo = async (todo) => {
  //PUT replaces the record, Send the whole todo not just the bit that changed
  //otherwise we loose every other key value that wasn't specified
  const response = await axios.put(`${BASE}/todos/${todo.id}`, todo);
  return response.data;
};

export const patchTodo = async (id, changes) => {
  //PATCH merges. Send only what changed; the server keeps the res
  const response = await axios.patch(`${BASE}/todos/${id}`, changes);
  return response.data;
};
