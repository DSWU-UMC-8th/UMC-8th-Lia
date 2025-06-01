import React from "react";
import ModalButton from "./ModalButton";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <aside className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[90%] text-center">
        {children}
        <ModalButton />
      </div>
    </aside>
  );
};

export default Modal;
