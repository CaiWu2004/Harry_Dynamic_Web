import { GoBell, GoTrash } from "react-icons/go";
import Button from "../components/Button";

const ButtonPage = () => {
  return (
    <>
      <h1 className="text-3xl mb-4">Button Page!</h1>
      {/* <Button>Buy Now</Button> Where removing this and redoing it*/}

      {/* <button className="px-8 py-3 border bg-blue-500 border-blue-50">
        Buy Now
      </button>
      <button className="px-8 py-3 border bg-blue-500 border-blue-50">
        Success
      </button>
      <button className="px-8 py-3 border bg-blue-500 border-blue-50">
        Delete
      </button> */}
      {/* <Button primary>Buy Now</Button> */}
      {/* pressing the button allows the click to appear on my inspector windows */}
      <div>
        <Button primary small onClick={() => console.log("CLICK!")}>
          <GoBell />
          Buy Now
        </Button>
      </div>
      {/* <Button success>Success</Button> */}
      {/* <Button secondary rounded>
        Secondary Button
      </Button> */}
      {/* a caller's own class has to survive the merge */}
      <div>
        <Button secondary rounded className="mb-5">
          Secondary Button
        </Button>
      </div>
      {/* <Button danger>Delete</Button> */}
      <div>
        <Button danger large>
          <GoTrash />
          Delete
        </Button>
      </div>
      {/* these two look broken why? */}
      <div>
        <Button warning outline rounded>
          Are you sure?
        </Button>
      </div>
      <div>
        <Button success outline>
          Success
        </Button>
      </div>
      <div>
        <Button success secondary>
          Trial
        </Button>
      </div>
    </>
  );
};

export default ButtonPage;
