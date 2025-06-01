import React from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { openModal } from "../features/modal/modalSlice";

const CartContainer: React.FC = () => {
  const { cartItems, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-5">
      <header className="text-center mb-5">
        <h2 className="text-2xl font-semibold text-gray-800">당신이 선택한 음반</h2>
      </header>

      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <footer className="text-center mt-6">
        <hr className="border-t border-gray-300 my-5" />
        <div className="cart-total">
          <h4 className="text-lg font-bold text-gray-800">
            총 가격 <span className="text-blue-500">₩ {total}원</span>
          </h4>
        </div>
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white text-base px-5 py-2 rounded cursor-pointer"
          onClick={() => dispatch(openModal())}
        >
          장바구니 초기화
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
