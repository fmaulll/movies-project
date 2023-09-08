import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteCartItem, setCart, setLoading } from "../../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { MovieDetailType } from "../../type";
import {
  BsFillCartCheckFill,
  BsCartPlusFill,
  BsFillCartXFill,
} from "react-icons/bs";
import { convertRupiah } from "../../helper";

const apiKey = "1082ebc";

const Detail = () => {
  const dispatch = useAppDispatch();
  const { id, p } = useParams();

  const cart = useAppSelector((state) => state.movie.cart);

  const [detail, setDetail] = useState<MovieDetailType>({
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    Ratings: [],
    Metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    Type: "",
    DVD: "",
    BoxOffice: "",
    Production: "",
    Website: "",
    Response: "",
  });

  const validateCartItem = (id: string) => {
    return cart.find((item) => item.imdbID === id);
  };

  const handleAddToCart = () => {
    const data = {
        title: detail.Title,
        year: detail.Year,
        imdbID: id,
        type: detail.Type,
        poster: detail.Poster,
        price: p,
    }
    dispatch(setCart(data));
  };

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem(detail.imdbID));
  };

  const getDetail = async () => {
    dispatch(setLoading(true));
    try {
      const results = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
      );

      if (results.status === 200) {
        setDetail(results.data);
      }
    } catch (error) {
      alert(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="mt-32 flex">
      <img className="w-[300px] object-cover" src={detail.Poster} alt={detail.Title} />
      <div className="ml-8 w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-white">
            {detail.Title} ({detail.Year})
          </h1>
          <div className="flex gap-2">
            {detail.Ratings.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3 className="text-white font-bold">
                  {item.Source === "Internet Movie Database"
                    ? "IMDb"
                    : item.Source}
                </h3>
                <span className="text-3xl text-white font-bold">
                  {item.Value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-gray-500 ">
          {detail.Type} | {detail.Year} | {detail.Runtime} | {detail.Language}
        </p>
        <div className="flex gap-2 mt-8">
          {detail.Genre.split(", ").map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 text-white rounded-full border-2 w-min"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="text-white text-xl mt-4">{detail.Plot}</p>
        <div className="flex justify-between text-white text-xl mt-4 border-t pt-2">
          <span className="font-bold">Director</span> {detail.Director}
        </div>
        <div className="flex justify-between text-white text-xl mt-4 border-t pt-2">
          <span className="font-bold">Writer</span> {detail.Writer}
        </div>
        <div className="flex justify-between text-white text-xl mt-4 border-t pt-2">
          <span className="font-bold">Actor</span> {detail.Actors}
        </div>
        <div className="flex justify-between items-center mt-8">
            <span className="text-3xl font-bold text-white">{convertRupiah(parseInt(p!))}</span>
          {!validateCartItem(detail.imdbID) ? (
            <div
              onClick={handleAddToCart}
              className="w-min p-5 bg-white rounded-full mt-1 mr-1 shadow-xl cursor-pointer"
            >
              <BsCartPlusFill className="text-slate-900" size={30} />
            </div>
          ) : (
            <div className="group cursor-pointer">
              <div className="p-5 bg-green-600 rounded-full mt-1 mr-1 shadow-xl z-10 block group-hover:hidden">
                <BsFillCartCheckFill className="text-slate-900" size={30} />
              </div>
              <div
                onClick={handleDeleteCartItem}
                className="p-5 bg-red-600 rounded-full mt-1 mr-1 shadow-xl z-10 hidden group-hover:block"
              >
                <BsFillCartXFill className="text-slate-900" size={30} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
