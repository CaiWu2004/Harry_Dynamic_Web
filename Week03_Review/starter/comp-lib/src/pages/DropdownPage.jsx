import { useState } from "react";
import Dropdown from "../components/Dropdown";

const OPTIONS = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

//Tailwind scans your source for complete class strings, so
// `bg-${value}-500` will NOT work. Map them out explicitly instead.
const COLOR_MAP = {
  red: "bg-red-500",
  green: "bg-green-400",
  blue: "bg-blue-500",
};

const DATA_TO_FILTER = [
  { id: 1, name: "Katie", team: "red" },
  { id: 2, name: "Ali", team: "green" },
  { id: 3, name: "Tony", team: "blue" },
  { id: 4, name: "River", team: "red" },
  { id: 5, name: "Yi", team: "green" },
];

const DropdownPage = () => {
  //The selcted value lives in the PARENT, not in Dropdown --that way this
  // page (and anything else on it) can react to tbe selection
  const [value, setValue] = useState(null);

  let filteredData = DATA_TO_FILTER;

  // ?. is optional chaining: if value is bull, stop, do not explode.
  if (value?.value) {
    filteredData = DATA_TO_FILTER.filter((s) => {
      return s.team === value.value;
    });
  }

  const handleChange = (option) => {
    setValue(option);
  };
  return (
    <>
      {/* <Dropdown options={OPTIONS} /> */}
      {/* <h1>Dropdown page with user selected value of: {value?.label}</h1> */}
      <h1 className={COLOR_MAP[value?.value] || undefined}>
        Dropdown page with user selected value of: {value?.label}
      </h1>
      <Dropdown options={OPTIONS} onChange={handleChange} value={value} />
      <h2 className="mt-4">Students from {value?.label ?? "every team"}:</h2>
      {filteredData.map((student) => (
        <p key={student.id}>{student.name}</p>
      ))}
    </>
  );
};

export default DropdownPage;
