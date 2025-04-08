/*import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MoviePage(){
  const { category = 'popular' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  const handlePrev = () => {
    if (page > 1) {
      setSearchParams({ page: String(page - 1) });
    }
  };

  const handleNext = () => {
    setSearchParams({ page: String(page + 1) });
  };

  if (isError) {
    return <div className="text-red-500 text-2xl">에러가 발생했습니다.</div>;
  }

  return (
    <>
      
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          className="bg-[#d2dba1] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#b4c275] disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={handlePrev}
          disabled={page === 1}
        >
          &lt;
        </button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#d2dba1] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#b4c275]"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>


      {isPending ? (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}*/


import { useParams, useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useCustomFetch from '../hooks/useCustomFetch';
import { Movie, MovieResponse } from '../types/movie';

export default function MoviePage() {
  const { category = 'popular' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;
  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);

  const handlePrev = () => {
    if (page > 1) setSearchParams({ page: String(page - 1) });
  };

  const handleNext = () => {
    setSearchParams({ page: String(page + 1) });
  };

  if (isError) {
    return <div className="text-red-500 text-2xl">에러가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-[#d2dba1] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#b4c275] disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        <span>{page} 페이지</span>
        <button
          onClick={handleNext}
          className="bg-[#d2dba1] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#b4c275]"
        >
          &gt;
        </button>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
