import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={`${movie.title} 영화 이미지`}
        className="w-full h-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm flex flex-col justify-end p-4 text-white">
          <h2 className="text-base font-bold">{movie.title}</h2>
          <p className="text-xs text-gray-300 mt-1 line-clamp-4">{movie.overview}</p>
        </div>
      )}
    </div>
  );
}
