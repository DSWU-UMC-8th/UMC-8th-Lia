import React from "react";
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

interface CartItemProps {
  id: string;
  img?: string;
  title: string;
  price: number;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className="flex items-center justify-between bg-white p-3 mb-3 rounded-lg shadow">
      <img src={img} alt={title} className="w-12 h-12 rounded" />
      <div className="flex-1 ml-3 mt-3">
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
        <p className="text-base font-bold text-blue-500 mt-1">₩ {price}</p>
        <button
          className="mt-2 text-xs text-red-500 hover:underline"
          onClick={() => dispatch(removeItem(id))}
        >
          삭제
        </button>
      </div>
      <div className="flex flex-col items-center ml-4">
        <button onClick={() => dispatch(increase(id))}>
          <HiOutlineChevronUp className="w-5 h-5 text-gray-700" />
        </button>
        <p className="text-sm font-medium">{amount}</p>
        <button onClick={() => dispatch(decrease(id))}>
          <HiOutlineChevronDown className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
