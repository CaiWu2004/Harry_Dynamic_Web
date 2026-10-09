const FILTER = ["all", "active", "done"];

const TodoFilter = (props) => {
  const { current, onChange } = props;

  const buttons = FILTER.map((name) => {
    const isSelected = name === current;
    return (
      <button
        key={name}
        onClick={() => onChange(name)}
        className={
          isSelected
            ? "bg-blue-900 text-white px-3 py-1 rounded text-sm"
            : "border border-gray-300 px-3 py-1 rounded text-sm"
        }
      ></button>
    );
  });

  return <div className="flex gap-2 my-4">{buttons}</div>;
};

export default TodoFilter;
