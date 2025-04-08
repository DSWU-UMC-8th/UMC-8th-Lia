import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
}

interface Credit {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credit[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }),
        ]);
        setMovie(movieRes.data);
        setCredits([...creditRes.data.cast, ...creditRes.data.crew]);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isPending) {
    return <div className="text-center mt-20 text-xl">로딩 중...</div>;
  }

  if (isError || !movie) {
    return <div className="text-red-500 text-center mt-20 text-2xl">영화 정보를 불러오는 데 실패했습니다.</div>;
  }

  const directors = credits.filter((c) => c.job === 'Director');
  const cast = credits.filter((c) => c.character).slice(0, 12); // 상위 12명만

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* 배경 */}
      <div
        className="w-full h-80 bg-cover bg-center rounded-lg shadow-lg mb-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* 영화 정보 */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
          <p className="text-gray-600 mb-2">
            평균 ⭐ {movie.vote_average} / {movie.release_date} / {movie.runtime}분
          </p>
          <p className="text-base text-gray-800 leading-relaxed">{movie.overview}</p>
        </div>
      </div>

      {/* 감독 */}
      {directors.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">🎬 감독</h2>
          <div className="flex gap-4 overflow-x-auto">
            {directors.map((d) => (
              <div key={d.id} className="text-center">
                {d.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${d.profile_path}`}
                    alt={d.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-black mx-auto mb-2" />
                )}
                <p className="text-sm">{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 출연진 */}
      {cast.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">🧑‍🎤 출연</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-black mx-auto mb-2" />
                )}
                <p className="font-medium">{actor.name}</p>
                <p className="text-sm text-gray-500">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
