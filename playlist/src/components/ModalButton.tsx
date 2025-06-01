import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";

const ModalButton: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => {
          dispatch(clearCart());
          dispatch(closeModal());
        }}
      >
        예
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => dispatch(closeModal())}
      >
        아니오
      </button>
    </div>
  );
};

export default ModalButton;
