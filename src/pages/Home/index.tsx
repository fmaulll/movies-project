import axios from "axios";
import { useState, useEffect } from "react";
import MovieItem from "../../components/MovieItem";
import { MoviesResType, MoviesType } from "../../type";

const apiKey = "1082ebc";

function Home() {
  const [search, setSearch] = useState<string>("movie");
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<MoviesType[]>([]);

  const getMovies = async () => {
    try {
      const results = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`
      );

      if (results.status === 200) {
        const { Search } = results.data;

        const arrMovies: MoviesType[] = [];
        Search.map((item: MoviesResType) => {
          if (!movies.find((movie) => movie.imdbID === item.imdbID)) {
            arrMovies.push({
              title: item.Title,
              year: item.Year,
              imdbID: item.imdbID,
              type: item.Type,
              poster: item.Poster,
              price: Math.floor(Math.random() * (1000000 - 100000)) + 100000
            });
          }
        });

        setMovies((prev) => {
          return [...prev, ...arrMovies];
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="p-8 bg-slate-900">
      <div className="grid grid-cols-5 gap-8">
        {movies.map((item, index) => (
          <MovieItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
