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
      <Link to="/NavBar" className="text-blue-500">
        NavBar
      </Link>
      <Link to="/dropdown" className="text-blu-500">
        Dropdown
      </Link>
    </Panel>
  );
};

export default Nav_bar;
