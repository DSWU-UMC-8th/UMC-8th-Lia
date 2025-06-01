import React from "react";
import { useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RootState } from "../store/store";

const Navbar: React.FC = () => {
  const { amount } = useSelector((state: RootState) => state.cart);

  return (
    <nav className="bg-indigo-600 px-5 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h3 className="text-white text-2xl font-bold">REAL DATA UMC PlayList</h3>
        <div className="relative">
          <HiOutlineShoppingBag className="w-7 h-7 text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
            {amount}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
