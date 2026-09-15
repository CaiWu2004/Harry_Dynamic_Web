import { GoBell, GoTrash } from "react-icons/go";
import Button from "../components/Button";

const ButtonPage = () => {
  return (
    <>
      <h1 className="text-3xl mb-4">Button Page!</h1>
      <div className="mb-3">
        <Button primary onClick={() => console.log("Click")}>
          <GoBell />
          Primary
        </Button>
      </div>
      <div className="mb-3">
        <Button secondary rounded>
          Secondary
        </Button>
      </div>
      <div className="mb-3">
        <Button danger>Danger</Button>
      </div>
      <div className="mb-3">
        <Button warning outline rounded>
          Warning
        </Button>
      </div>
      <div className="mb-3">
        <Button success outline>
          Success
        </Button>
      </div>
      {/* only one color varients can be use at a time, create a warning for other developers if they do */}
      <div className="mb-3">
        <Button primary secondary rounded>
          <GoTrash />
          Primary Secondary Rounded
        </Button>
      </div>

      {/* <button className="px-8 py-3 border bg-blue-500 border-blue-500 text-white">Success</button> */}
    </>
  );
};

export default ButtonPage;
