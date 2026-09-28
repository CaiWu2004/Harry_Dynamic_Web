// import our libraries first
import { Routes, Route } from "react-router-dom";
//then our own components
import Nav_bar from "./components/Nav_bar";
import ButtonPage from "./pages/ButtonPage";
import AccordionPage from "./pages/AccordionPage";
import NavBarPage from "./pages/NavBarPage";
import Dropdown from "./pages/DropdownPage";
//then css and data

// Right now App is doing the job of a page. Next Week we add routes
//so each of these gets its own url
const App = () => {
  return (
    // <div className="container mx-auto mt-4">
    //   {/* <ButtonPage />
    //   <hr className="my-8" />
    //   <AccordionPage /> */}
    //   <Routes>
    //     <Route path="/" element={<ButtonPage />} />
    //     <Route path="/accordion" element={<AccordionPage />} />
    //     <Route path="/NavBar" element={<NavBarPage />} />
    //   </Routes>
    // </div>
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <div>
        <Nav_bar />
      </div>
      <div className="col-span-5">
        <Routes>
          <Route path="/" element={<ButtonPage />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/NavBar" element={<NavBarPage />} />
          <Route path="/dropdown" element={<Dropdown />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
