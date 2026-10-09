// ?Why does the GET live in a useEffect with
// ?[] rather than just being called in
// ?the component body?
//Its in the useEffect with [] rather than being called
//in the component body because we only want it to be
//called once instead of multiple times

//?In deleteTodoById, what happens if you move
//?setTodos(...) above the await? Describe
//?what the user would see when the server is down.
//If I were to setTodos(...) above await,
// the delete button wouldn't work
//If the server were down the user would still see the search bar and button
//however a warning will appear saying "Could not reach the server. Is `npm run server` running?"

//?Your filter in #2 — did it need a request? Why not?
//No, because every todo is already in state, filter only filter and
//put out what can and can't be seen. it doesn't do any request or,
//push something. request are only for changing something or loading the data.

import { useState, useEffect } from "react";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
  patchTodo as patchTodoRequest,
} from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.don;
    if (filter === "done") return todo.done;
  });

  const remaining = todos.filter((todo) => !todo.done).length;
  //[] mean only run once when component first meets
  //that would fetch, set state, re-render, fetch again, forever
  useEffect(() => {
    const loadTodos = async () => {
      try {
        //get the todos from the server
        const todos = await fetchTodos();
        setTodos(todos);
      } catch (err) {
        //the usual cause; you forgot to start the server in the second tab
        console.error(err);
        setError("Could not reach the server. Is `npm run server` running?");
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

  const createTodo = async (title) => {
    //the server makes the ID now, so we no longer invent one
    const newTodo = await createTodoRequest(title);
    //then react stuff the todo
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  };

  const deleteTodoById = async (id) => {
    //ask the server first. If it refuses, we never touch our state,
    // and the screen keeps telling the truth

    await deleteTodoRequest(id);

    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };

  const editTodoById = async (id, newTitle) => {
    //find the whole todo and send all of it because PUT replaces the entire record
    const todo = todos.find((todo) => todo.id === id);
    const updated = await updateTodoRequest({ ...todo, title: newTitle });
    // map return a new array the SAME length, every todo comes back
    // the one we are editing comes back as a new object with a new title
    const updatedTodos = todos.map((todo) => {
      // find the one to edit by ID, copy all properties into a new object, THEN override the title field with the new title from the edit form
      if (todo.id === id) {
        return updated;
      }
      // return all other todos as is
      return todo;
    });
    setTodos(updatedTodos);
  };
  //toggle handler
  const toggleTodoById = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    //ask the server first; only touch state if it says yes
    const updated = await patchTodoRequest(id, { done: !todo.done });
    setTodos(todo.map((t) => (t.id === id ? updated : t)));
  };
  // console.log(todos)

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createTodo} />
      {isLoading && <p className="text-gray-500">Loading your todos...</p>}

      {error && <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>}

      {!isLoading && !error && todos.length === 0 ? (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      ) : (
        <TodoList
          //check if the todos are done or not
          todos={visibleTodos}
          onDelete={deleteTodoById}
          onEdit={editTodoById}
          onToggle={toggleTodoById}
        />
      )}

      <p className="mt-6 text-sm text-gray-500">
        {remaining} {remaining === 1 ? "thing" : "things"} to do
      </p>

      <TodoFilter current={filter} onChange={setFilter} />
    </div>
  );
}

export default App;
