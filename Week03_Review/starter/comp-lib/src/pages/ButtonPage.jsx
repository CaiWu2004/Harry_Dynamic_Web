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
      <Button primary>Buy Now</Button>
      {/* <Button success>Success</Button> */}
      <Button secondary rounded>
        Secondary Button
      </Button>
      <Button danger>Delete</Button>
      {/* these two look broken why? */}
      <Button warning outline rounded>
        Are you sure?
      </Button>
      <Button success outline>
        Success
      </Button>
    </>
  );
};

export default ButtonPage;
