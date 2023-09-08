import React, { FC } from "react";
import { BsCartFill } from "react-icons/bs";
import { useAppSelector } from "../hooks";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const cart = useAppSelector((state) => state.movie.cart);
  return (
    <div className="px-8 bg-slate-900 h-screen overflow-y-scroll relative">
      <div className="h-[100px] fixed w-full bg-black left-0 z-20 px-8 flex items-center justify-between">
        <h1 className="font-bold text-3xl text-white">Movie</h1>

        <div className="px-4 py-2 bg-black border-4 rounded-xl mt-2 mr-2 shadow-xl cursor-pointer relative group">
          <BsCartFill className="text-white" size={25} />
          <div className="bg-white absolute top-[40px] right-0 p-4 invisible group-hover:visible w-[300px] flex flex-col ">
            <h3>My Items</h3>
            <div>
              {cart.map((item, index) => (
                <div key={index} className="border-t flex justify-between ">
                  <span>
                    {item.title.slice(0,10) + "..."} {`(${item.year})`}
                  </span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div>
                <span>Total: {}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
