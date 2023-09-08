import axios from "axios";
import { useState, useEffect } from "react";
import MovieItem from "../../components/MovieItem";
import { MoviesResType, MoviesType } from "../../type";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppDispatch } from "../../hooks";
import { setLoading } from "../../features/movieSlice";

const apiKey = "1082ebc";

function Home() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("movie");
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [totalRow, setTotalRow] = useState<number>(0);

  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const getMovies = async () => {
    dispatch(setLoading(true));
    try {
      const results = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`
      );

      if (results.status === 200) {
        const { Search, totalResults } = results.data;

        const arrMovies: MoviesType[] = [];
        Search.map((item: MoviesResType) => {
          if (!movies.find((movie) => movie.imdbID === item.imdbID)) {
            arrMovies.push({
              title: item.Title,
              year: item.Year,
              imdbID: item.imdbID,
              type: item.Type,
              poster: item.Poster,
              price: (Math.floor(Math.random() * (1000 - 100)) + 100) * 1000,
            });
          }
        });

        setMovies((prev) => {
          return [...prev, ...arrMovies];
        });
        setTotalRow(totalResults);
      }
    } catch (error) {
      alert(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <div className="mt-32">
      <div className="grid grid-cols-5 gap-8">
        {movies.slice(startIndex, endIndex).map((item, index) => (
          <MovieItem key={index} data={item} />
        ))}
      </div>
      <div className="flex items-center mt-4">
        <div
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl border-2 mr-4 cursor-pointer"
        >
          <FaChevronLeft className="text-white" size={30} />
        </div>
        <div
          onClick={handleNext}
          className="px-4 py-2 rounded-xl border-2 cursor-pointer"
        >
          <FaChevronRight className="text-white" size={30} />
        </div>
        <span className="ml-4 text-white">
          {startIndex + 1} - {endIndex} of {totalRow}
        </span>
      </div>
    </div>
  );
}

export default Home;
