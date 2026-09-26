import ButtonPage from "./pages/ButtonPage";
import AccordionPage from "./pages/AccordionPage";
import NavBarPage from "./pages/NavBarPage";

// Right now App is doing the job of a page. Next Week we add routes
//so each of these gets its own url
const App = () => {
  return (
    <div className="container mx-auto mt-4">
      <ButtonPage />
      <hr className="my-8" />
      <AccordionPage />
      <hr className="my-8" />
      <NavBarPage />
    </div>
  );
};

export default App;
