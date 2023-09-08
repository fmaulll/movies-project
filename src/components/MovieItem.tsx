import React, { FC } from "react";
import { BsCartPlusFill } from "react-icons/bs";

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
  return (
    <div className="w-full shadow-xl rounded-xl bg-white relative group">
      <img
        className="w-full rounded-xl object- h-[500px]"
        src={`http://img.omdbapi.com/?apikey=1082ebc&i=${data.imdbID}`}
        alt={data.title}
      />
      <div className="flex justify-center items-end w-full h-full absolute bg-black z-10 bottom-0 invisible bg-black-transparent-visible group-hover:visible duration-200 rounded-xl p-4">
        <div className="absolute top-0 right-0 p-4 bg-white rounded-full mt-2 mr-2 shadow-xl cursor-pointer">
          <BsCartPlusFill className="text-slate-900" size={30} />
        </div>
        <h3 className="font-bold text-2xl text-white text-center hover:text-purple-800 cursor-pointer duration-200">
          {data.title} {`(${data.year})`}
        </h3>
      </div>
    </div>
  );
};

export default MovieItem;