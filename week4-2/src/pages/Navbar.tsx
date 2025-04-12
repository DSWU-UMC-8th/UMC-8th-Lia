import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
      {/* 로고 / 앱 이름 */}
      <div
        onClick={() => navigate("/")}
        className="text-xl font-bold text-gray-800 cursor-pointer"
      >
        MyApp
      </div>

      {/* 버튼들 */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="text-sm text-gray-700 hover:text-black"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="text-sm bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
        >
          회원가입
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
