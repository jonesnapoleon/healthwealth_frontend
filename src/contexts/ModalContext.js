import React, { createContext, useContext } from "react";
import { useInput } from "../helpers/hooks";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { MODAL_ANIMATE_DURATION } from "../helpers/constant";
import "../components/commons/modal.scss";

export const ModalContext = createContext({});
export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }) => {
  const innerComponent = useInput(<div />);
  const show = useInput();

  return (
    <ModalContext.Provider
      value={{
        setInnerComponent: innerComponent.set,
        show,
      }}
    >
      {show?.value && (
        <Modal
          open={show?.value}
          focusTrapped={!false}
          onClose={() => {
            show?.set(false);
          }}
          showCloseIcon={false}
          onAnimationEnd={() => {
            if (!show?.value) {
              show?.set(false);
            }
          }}
          center
          classNames={{
            modal: `modal-base`,
            modalAnimationIn: "fadeIn",
            modalAnimationOut: "fadeOut",
          }}
          animationDuration={MODAL_ANIMATE_DURATION}
        >
          <div className="modal-content">{innerComponent?.value}</div>
        </Modal>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
