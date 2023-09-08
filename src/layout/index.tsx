import { FC } from "react";
import { BsCartFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { convertRupiah } from "../helper";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import ModalLoader from "../components/ModalLoader";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const { cart, loading } = useAppSelector((state) => state.movie);
  let total = 0;

  const handleRouting = () => {
    navigate("/")
  }

  return (
    <div className="px-[300px] pb-8 bg-slate-900 h-screen overflow-y-scroll relative">
      <div className="h-[100px] fixed w-full bg-black left-0 z-20 px-[300px] flex items-center justify-between">
        <h1 onClick={handleRouting} className="font-bold text-3xl text-white cursor-pointer">Movie</h1>
        <div className="px-4 py-2 bg-black border-4 rounded-xl mt-2 mr-2 shadow-xl cursor-pointer relative group">
          <BsCartFill className="text-white" size={25} />
          <div className="bg-white absolute top-[40px] right-0 invisible group-hover:visible w-[300px] flex flex-col cursor-auto">
            <h3 className="p-4">My Items</h3>
            <div>
              {cart.map((item, index) => {
                total += item.price;
                return (
                  <div
                    key={index}
                    className="border-t flex justify-between p-4 hover:bg-gray-300 cursor-pointer"
                  >
                    <span>
                      {item.title.slice(0, 10) + "..."} {`(${item.year})`}
                    </span>
                    <span>{convertRupiah(item.price)}</span>
                  </div>
                );
              })}
              <div className="pt-2">
                {cart.length < 1 ? (
                  <div className="flex justify-center flex-col items-center py-8">
                    <AiOutlineShoppingCart className="text-slate-900" size={40} />
                    <span>Cart is empty</span>
                  </div>
                ) : (
                  <div className="flex justify-between p-4">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{convertRupiah(total)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
      {loading ? <ModalLoader /> : null}
    </div>
  );
};

export default Layout;
