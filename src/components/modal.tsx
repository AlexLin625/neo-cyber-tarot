import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { routes } from "../utils/routes";
import { NavLink } from "react-router";
import { CornerUpLeft } from "lucide-react";

export interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export function Modal({
  showModal,
  setShowModal,
}: ModalProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [animateState, setAnimateState] =
    React.useState(false);

  useEffect(() => {
    if (showModal) {
      setAnimateState(false);
      requestAnimationFrame(() => {
        setIsVisible(true);
        requestAnimationFrame(() => {
          setAnimateState(true);
        });
      });
    } else {
      setAnimateState(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showModal]);

  if (!isVisible) return null;
  if (document.getElementById("modal-root") === null) {
    console.log("modal-root not found");
    return null;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return createPortal(
    isVisible && (
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-transparent block lg:hidden">
        <div
          className="fixed w-full h-full bg-black transition-opacity duration-300 z-[999]"
          style={{ opacity: animateState ? 0.5 : 0 }}
          onClick={() => {
            setShowModal(false);
          }}
        ></div>
        <div
          className="fixed h-full bg-[#2b2e45] right-0 z-[999] shadow-xl transition-transform duration-300"
          style={{
            width: "min(384px, 80vw)",
            transform:
              "translateX(" +
              (animateState ? "0" : "100%") +
              ")",
          }}
        >
          <div
            id="return-button-wrapper"
            className="flex flex-row justify-start items-center px-6 py-4"
          >
            <button
              onClick={handleCloseModal}
              className="text-white cursor-pointer hover:bg-white/10 rounded-full p-4"
            >
              <CornerUpLeft size={18} />
            </button>
          </div>

          <div className="flex flex-col items-center">
            {routes.map((v) => (
              <NavLink
                to={v.path}
                key={v.path}
                className="text-white text-2xl font-thin py-4 px-12 hover:bg-white/10 rounded-md w-full"
                onClick={handleCloseModal}
              >
                {v.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal-root")!
  );
}
