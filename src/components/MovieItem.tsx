import React, { FC } from "react";
import { BsCartPlusFill, BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteCartItem, setCart } from "../features/movieSlice";
import { MoviesType } from "../type";
import { convertRupiah } from "../helper";
import { useNavigate } from "react-router-dom";

interface Props {
  data: {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
    price: number;
  };
}

const MovieItem: FC<Props> = ({ data }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.movie.cart);

  const validateCartItem = (movie: MoviesType) => {
    return cart.find((item) => item.imdbID === movie.imdbID);
  };

  const handleAddToCart = () => {
    dispatch(setCart(data));
  };

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem(data))
  }

  const handleLink = () => {
    navigate(`/detail/${data.imdbID}`)
  }

  return (
    <div className="w-full shadow-xl rounded-xl bg-white relative group">
      <img
        className="w-full rounded-xl object- h-[500px]"
        src={`http://img.omdbapi.com/?apikey=1082ebc&i=${data.imdbID}`}
        alt={data.title}
      />
      {!validateCartItem(data) ? null : (
        <div className="absolute top-0 right-0 p-5 bg-green-600 rounded-full mt-1 mr-1 shadow-xl z-10">
          <BsFillCartCheckFill className="text-slate-900" size={30} />
        </div>
      )}
      <div className="flex flex-col items-center justify-end w-full h-full absolute bg-black z-10 bottom-0 invisible bg-black-transparent-visible group-hover:visible rounded-xl p-4">
        {!validateCartItem(data) ? (
          <div
            onClick={handleAddToCart}
            className="absolute top-0 right-0 p-4 bg-white rounded-full mt-2 mr-2 shadow-xl cursor-pointer"
          >
            <BsCartPlusFill className="text-slate-900" size={30} />
          </div>
        ) : (
          <div onClick={handleDeleteCartItem} className="absolute top-0 right-0 p-5 bg-red-600 rounded-full mt-1 mr-1 shadow-xl z-10 cursor-pointer">
            <BsFillCartXFill className="text-slate-900" size={30} />
          </div>
        )}
        <div
          onClick={handleAddToCart}
          className="absolute top-0 right-0 p-4 bg-white rounded-full mt-2 mr-2 shadow-xl cursor-pointer"
        >
          <BsCartPlusFill className="text-slate-900" size={30} />
        </div>
        <h3 onClick={handleLink} className="font-bold text-2xl text-white text-center hover:text-purple-800 cursor-pointer duration-200">
          {data.title} {`(${data.year})`}
        </h3>
        <div>
          <h3 className="mt-4 font-bold text-3xl text-white text-center">
            {convertRupiah(data.price)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
