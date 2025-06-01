import React from "react";
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

interface CartItemProps {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow">
      {/* 이미지 */}
      <img src={img} alt={`${title} 이미지`} className="w-12 h-12 rounded" />

      {/* 제목 및 가격 */}
      <div className="flex-1 ml-3 mt-3">
        <h4 className="text-sm font-semibold text-gray-800">
          {title} | {singer}
        </h4>
        <p className="text-base font-bold text-blue-500 mt-1">₩ {price}</p>
      </div>

      {/* 수량 조절 */}
      <div className="flex flex-col items-center ml-4">
        <button onClick={() => dispatch(increase(id))}>
          <HiOutlineChevronUp className="w-5 h-5 text-gray-700" />
        </button>
        <p className="text-sm font-medium">{amount}</p>
        <button
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <HiOutlineChevronDown className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
