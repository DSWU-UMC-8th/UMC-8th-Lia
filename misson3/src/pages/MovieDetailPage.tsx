import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
  const { id } = useParams();

  return <div>영화 상세 페이지 (ID: {id})</div>;
};

export default MovieDetailPage;
