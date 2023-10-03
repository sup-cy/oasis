import { HiPencil } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function EdditCabin({ data }) {
  return (
    <Modal>
      <Modal.Open opensWindowName="cabin-edit-form">
        <button>
          <HiPencil />
        </button>
      </Modal.Open>
      <Modal.Window name="cabin-edit-form">
        <CreateCabinForm cabinToEdit={data} />
      </Modal.Window>
    </Modal>
  );
}

export default EdditCabin;
