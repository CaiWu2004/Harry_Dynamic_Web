import { useState } from "react";

const TodoCreate = (props) => {
  const { onCreate } = props;
  //the input's text lives here -- this component owns it, because nobody
  //else needs to know what you are halfway through typing
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    // dont allow the form field to refresh the page
    event.preventDefault();
    // pass local title state up to app parent via onCreate prop
    onCreate(title);
    // clearing out the form after the user submits
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="What needs to be done?"
        className="flex-1 border border-gray-300 py-3 rounded"
      />
      <button className="bg-blue-900 text-white px-5 py-2 rounded">Add</button>
    </form>
  );
};

export default TodoCreate;
