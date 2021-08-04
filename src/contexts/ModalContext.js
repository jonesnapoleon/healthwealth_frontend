import React, { createContext, useContext } from "react";
import { useInput } from "../helpers/hooks";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { MODAL_ANIMATE_DURATION } from "../helpers/constant";
import "../components/commons/modal.scss";

export const ModalContext = createContext({});
export const useModal = () => useContext(ModalContext);

const DEFAULT_BG_COLOR = "var(--secondary-extra-color-4)";

const ModalProvider = ({ children }) => {
  const innerComponent = useInput(<div />);
  const show = useInput(false);
  const showIcon = useInput(false);
  const size = useInput(false);
  const bg = useInput(false);
  const backgroundColor = useInput(DEFAULT_BG_COLOR);

  const onClose = () => {
    showIcon?.set(false);
    show?.set(false);
    bg?.set("");
    size?.set("");
    backgroundColor?.set(DEFAULT_BG_COLOR);
  };

  return (
    <ModalContext.Provider
      value={{
        setInnerComponent: innerComponent.set,
        show,
        showIcon,
        size,
        bg,
        backgroundColor,
        onClose,
      }}
    >
      {show?.value && (
        <Modal
          open={show?.value}
          onClose={onClose}
          focusTrapped={showIcon?.value ? true : false}
          closeOnOverlayClick={showIcon?.value ? false : true}
          showCloseIcon={showIcon?.value ? true : false}
          onAnimationEnd={() => {
            if (!show?.value) {
              show?.set(false);
              showIcon?.set(false);
            }
          }}
          center
          classNames={{
            modal: `modal-base modal-${size?.value ?? "large"} `,
            modalAnimationIn: "fadeIn",
            modalAnimationOut: "fadeOut",
          }}
          styles={{
            modal: { backgroundColor: backgroundColor?.value },
          }}
          animationDuration={MODAL_ANIMATE_DURATION}
        >
          {bg?.value === "light" && (
            <style>
              {`
                .react-responsive-modal-overlay {
                  background-color: rgba(174,174,174,0.8);
                }
              `}
            </style>
          )}
          <div className="modal-content">{innerComponent?.value}</div>
        </Modal>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
