import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

const Accordion = (props) => {
  const { items } = props;

  // !!Removed
  // everything visible, no interactivity. Get the markup right first
  // const renderedItems = items.map((item) => {

  //Which item is open? -1 means "none of them"
  const [expendedIndex, setExpendedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    // when the new value depends on the current one, use this form
    setExpendedIndex((currentExpendedIndex) => {
      //clicking the open item closes it
      if (currentExpendedIndex === nextIndex) {
        return -1;
      }
      return nextIndex;
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpended = index === expendedIndex;

    // a ternary: condition ? whenTrue : whenFalse
    const icon = (
      <span className="text-2x1">
        {isExpended ? <GoChevronDown /> : <GoChevronLeft />}
      </span>
    );

    return (
      <div key={item.id}>
        {/* <div className="flex justify-between items-center p-3 bg-gray-100 border-b"> */}
        <div
          onClick={() => handleClick(index)}
          className="flex justify-between items-center p-3 bg-gray-100 border-b cursor-pointer"
        >
          {item.label}
          {icon}
        </div>
        {/* <div className="border-b p-5">{item.content}</div> */}
        {/* conditional rendering: the content div only exists when open */}
        {isExpended && <div className="border-b p-5">{item.content}</div>}
      </div>
    );
  });

  return <div>{renderedItems}</div>;
};

export default Accordion;
