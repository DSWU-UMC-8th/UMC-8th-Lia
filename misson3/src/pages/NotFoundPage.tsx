import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-dvh text-center px-4">
      <h1 className="text-5xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        페이지를 찾을 수 없습니다.
      </h2>
      <p className="text-gray-500 mb-6">
        요청하신 페이지가 존재하지 않거나, 이동된 경로일 수 있어요.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-[#d2dba1] text-white rounded-lg shadow hover:bg-[#b4c275] transition-all"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
