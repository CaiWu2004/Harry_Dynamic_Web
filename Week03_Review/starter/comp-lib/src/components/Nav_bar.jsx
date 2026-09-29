import { Link } from "react-router-dom";
import Panel from "./Panel";

const Nav_bar = () => {
  return (
    <Panel className="sticky top-0 flex flex-col items-start gap-1">
      <Link to="/" className="text-blue-500">
        Buttons
      </Link>
      <Link to="/accordion" className="text-blue-500">
        Accordion
      </Link>
      <Link to="/dropdown" className="text-blue-500">
        Dropdown
      </Link>
      <Link to="/modal" className="text-blue-500">
        Modal
      </Link>
      {/* Homework, personal navbar components. Different from the one from class */}
      <Link to="/NavBar" className="text-blue-500">
        NavBar
      </Link>
    </Panel>
  );
};

export default Nav_bar;
