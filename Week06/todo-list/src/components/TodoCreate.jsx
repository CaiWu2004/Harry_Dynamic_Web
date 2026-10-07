import { useState } from "react";

const TodoCreate = (props) => {
  const { onCreate } = props;

  const [title, setTitle] = useState("");

  //an event
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    //don't allow the fprm field to refresh page
    event.preventDefault();
    //pass local tile state up to app parent via onCreate prop
    onCreate(title);
    //clear out the form after user submits
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="What needs to be done?"
        className="flex-1 border border-gray-300 rounded py-3"
      />
      <button className="bg-blue-900 text-white px-5 py-2 rounded">
        Add Todo
      </button>
    </form>
  );
};

export default TodoCreate;
