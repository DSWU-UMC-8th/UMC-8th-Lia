import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import { MovieDetailResponse } from '../types/movie';

interface Credit {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
}

interface CreditsResponse {
  cast: Credit[];
  crew: Credit[];
}

export default function MovieDetailPage() {
  const { id } = useParams();

  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  const creditUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`;

  const {
    data: movie,
    isPending: movieLoading,
    isError: movieError,
  } = useCustomFetch<MovieDetailResponse>(movieUrl);

  const {
    data: creditsData,
    isPending: creditsLoading,
    isError: creditsError,
  } = useCustomFetch<CreditsResponse>(creditUrl);

  if (movieLoading || creditsLoading) {
    return <div className="text-center mt-20 text-xl">로딩 중...</div>;
  }

  if (movieError || creditsError || !movie || !creditsData) {
    return <div className="text-red-500 text-center mt-20 text-2xl">영화 정보를 불러오는 데 실패했습니다.</div>;
  }

  const credits = [...creditsData.cast, ...creditsData.crew];
  const directors = credits.filter((c) => c.job === 'Director');
  const cast = credits.filter((c) => c.character).slice(0, 12);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div
        className="w-full h-80 bg-cover bg-center rounded-lg shadow-lg mb-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />
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
