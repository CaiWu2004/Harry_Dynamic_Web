import Modal from "../components/Model";
import Button from "../components/Button";

const ModalPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <Button success rounded onClick={handleClick}>
        Open Modal
      </Button>

      {/* Coming Soon, Modal to Render */}
      {modalOpen && <Modal />}
    </div>
  );
};

export default ModalPage;
