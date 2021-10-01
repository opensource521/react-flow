import React, { useEffect } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { Header, LeftBar, RightBar, Content, ModalContent } from "./components";
import { setModalOpen, setModules } from "./store/actions";
import { selectModalOpen } from "./store/selectors";
import { apiData } from "./services/data";
import "./App.css";

const CUSTOM_STYLES = {
  content: {
    top: "50%",
    left: "50%",
    right: "20%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const App: React.FC = () => {
  const modalOpen = useSelector(selectModalOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setModules(apiData));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <div>
      <Header />
      <div className="main">
        <LeftBar />
        <Content />
        <RightBar />
      </div>

      <Modal isOpen={modalOpen} style={CUSTOM_STYLES} ariaHideApp={false}>
        <button className="btn-close" onClick={handleClose}>
          Close
        </button>
        <ModalContent />
      </Modal>
    </div>
  );
};

export default App;
