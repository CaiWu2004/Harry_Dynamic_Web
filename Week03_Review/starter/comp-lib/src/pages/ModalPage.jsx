import { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";

const LIPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt massa eget orci porttitor, quis tempor nibh viverra. In vitae mattis neque. Nunc et dignissim nibh. Curabitur sed sapien sit amet ante gravida consectetur ut sit amet odio. Integer eleifend elementum nulla, sed accumsan diam mattis vel.";

const ModalPage = () => {
  //isModalOpen lives HERE, in the parent of both the Buttin that opens it
  //and the Modal itself
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => setModalOpen(true);
  const handleCloseClick = () => setModalOpen(false);

  const modalContent = (
    <p>This is modal content populated by the children prop!</p>
  );

  //Passing the buttons in as a prop means the same Modal can be a confirm
  // dialog, a wizard step, or anything else
  const actionBar = (
    <>
      <Button
        success
        outline
        onClick={() => console.log("other button function fired!")}
        className="mr-8"
      >
        Some Promt...
      </Button>
      <Button danger outline onClick={handleCloseClick}>
        Close Modal
      </Button>
    </>
  );

  return (
    <div>
      {/* enough text to make the page scroll, so we can see why'fixed'
      matters and why we lock body scroll */}
      {[...Array(8)].map((_, i) => (
        <p key={i} className="mb-4">
          {LIPSUM}
        </p>
      ))}

      <Button onClick={handleClick} succes rounded>
        Open Modal!
      </Button>

      {/* {modalOpen && <Modal />} */}
      {/* {modalOpen && <Modal onClose={handleCloseClick} />} */}
      {modalOpen && (
        <Modal onClose={handleCloseClick} actionBar={actionBar} crazy>
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default ModalPage;
