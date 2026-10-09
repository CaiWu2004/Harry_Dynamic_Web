import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const { todos, onDelete, onEdit } = props;

  const renderedTodos = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onedit={onEdit} />
    );
  });

  return <div>{renderedTodos}</div>;
};

export default TodoList;
