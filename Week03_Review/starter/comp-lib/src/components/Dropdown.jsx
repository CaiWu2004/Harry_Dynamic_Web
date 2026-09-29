// import { useState } from "react";
// import { useState, useRef } from "react";
import { useState, useRef, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

const Dropdwon = (props) => {
  // const { options } = props;
  const { options, onChange, value } = props;
  const [isOpen, setIsOpen] = useState(false);

  //useRef gives us a handle on a real DOM element.
  //We attach it to the outer div belowe with ref={divEl}
  const divEl = useRef();
  /*
    useEffect takes two arguments: a function, and an array of things to watch.
      useEffect(fn, [])      -> run once, when the component mounts
      useEffect(fn, [thing]) -> run on mount and whenever `thing` changes
      useEffect(fn)          -> run after every single render

    Here we add a plain old document click listener so we can close the
   dropdown when the user clicks somewhere else on the page.

    If the function returns another function, React calls that on unmount --
    the cleanup. Without it we would pile up listeners forever.
  */

  useEffect(() => {
    const handlerFunction = (event) => {
      if (!divEl.current) return;
      if (!divEl.current.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("click", handlerFunction);

    return () => {
      document.removeEventListener("click", handlerFunction);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    // onChange belings to the parent -- he parent owns the selected value.
    onChange(option);
  };

  const renderedOptions = options.map((opt, index) => (
    <div
      onClick={() => handleOptionClick(opt)}
      key={index}
      className="hover:bg-sky-100 rounder cursor-pointer p-1"
    >
      {opt.label}
    </div>
  ));

  // Everything visiible, nothing clickable yet. Get the markup right first.
  return (
    // <div className="w-48 relative">
    <div ref={divEl} className="w-48 relative">
      {/* <Panel className="flex justify-between items-center cursor-pointer"> */}
      <Panel
        onClick={handleClick}
        className="flex justify-between items-center cursor-pointer"
      >
        {/* Select...
        <GoChevronDown /> */}
        {value ? value.label : "Select..."} <GoChevronDown />
      </Panel>
      {/* <Panel className="absolute top-full">{renderedOptions}</Panel> */}
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  );
};

export default Dropdwon;
