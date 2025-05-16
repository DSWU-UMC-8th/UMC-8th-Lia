import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import CommentList from "../components/Comment/CommentList";
import img from "../assets/profile.jpg";

const LpDetailPage = () => {
  const { id } = useParams();
  const lpId = Number(id);

  const { data: lpData } = useGetLpDetail(lpId);
  const { data: userInfo } = useQuery<ResponseMyInfoDto>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  if (!lpData) {
    return (
      <div className="text-white text-center mt-10">
        해당 LP를 찾을 수 없습니다. (id: {lpId})
      </div>
    );
  }

  const lp = lpData.data;

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-zinc-900 text-white rounded-xl p-13 shadow-md space-y-4 mt-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
          
            <img
  src={userInfo?.data.avatar || img}
  alt="프로필 이미지"
  className="w-8 h-8 rounded-full object-cover"
  onError={(e) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = img;
  }}
/>

            <span className="font-medium">{userInfo?.data.name}</span>
          </div>
          <span>{new Date(lp.createdAt).toISOString().slice(0, 10)}</span>
        </div>

        <div className="flex justify-between mt-8">
          <h1 className="text-xl font-semibold">{lp.title}</h1>
          <div className="text-xl text-white flex gap-3 items-end">
            <button className="hover:text-blue-600">
              <GoPencil />
            </button>
            <button className="hover:text-blue-600">
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center mt-10">
          <div className="w-80 h-80 shadow-xl/60 rounded-lg flex items-center justify-center">
            <div
              className="animate-spin relative w-72 h-72 rounded-full border-[6px] border-zinc-700"
              style={{ animationDuration: "13s" }}
            >
              <img
                src="/lp.png"
                alt="lp cover"
                className="w-full h-full object-cover rounded-full"
              />

      
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10 border border-gray-800" />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-200 text-center leading-relaxed mt-10">
          {lp?.content}
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {lp?.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-gray-300"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 pt-4">
          <button className="text-pink-500 text-xl hover:scale-110 transition">
            <FcLike />
          </button>
          <span className="text-sm">{lp.likes.length || 0}</span>
        </div>
      </div>

      <div className="mt-20">
        <CommentList lpId={lpId} />
      </div>
    </div>
  );
};

export default LpDetailPage;

/*import { useParams } from "react-router-dom";
import useGetLpById from "../hooks/queries/useGetLpById";
import CommentSection from "../components/LpCard/CommentSection";
import usePostLike from "../hooks/mutation/usePostLike";
import useDeleteLike from "../hooks/mutation/useDeleteLike";
import { useNavigate } from "react-router-dom";
import useDeleteLp from "../hooks/mutation/useDeleteLp";
import useUpdateLp from "../hooks/mutation/useUpdateLp";
import { useState } from "react";

const LpDetailPage = () => {
  const navigate = useNavigate();
  const { lpId: lpIdParam } = useParams();

  const lpId = Number(lpIdParam);
  const { data: lp, isLoading, isError, refetch } = useGetLpById(lpId);

  const userId = Number(localStorage.getItem("userId"));
  const isAuthor = userId === lp?.authorId; 
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");


  const isLiked = lp?.likes?.some((like) => like.userId === userId);


  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const { mutate: deleteLpMutate } = useDeleteLp();
  const { mutate: updateLpMutate } = useUpdateLp();

  const handleLikeLp = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    disLikeMutate({ lpId: Number(lpId) });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      deleteLpMutate(lpId);
    }
  };

  const startEdit = () => {
    setEditMode(true);
    setEditTitle(lp.title);
    setEditContent(lp.content);
  };

  const handleUpdate = () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    updateLpMutate(
      { lpId, title: editTitle, content: editContent },
      {
        onSuccess: () => {
          refetch(); 
                    
          setEditMode(false);
        }
      }

    );
    setEditMode(false);
  };

  if (isLoading) return <div className="mt-20">불러오는 중...</div>;
  if (isError || !lp) return <div className="mt-20">LP 정보를 불러올 수 없습니다.</div>;

return (
  <div className="p-8 max-w-3xl mx-auto">
    <img
      src={lp.thumbnail}
      alt={lp.title}
      className="w-full h-64 object-cover rounded-lg mb-6"
    />

    {editMode ? (
      <input
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full text-3xl font-bold mb-2 border p-2"
      />
    ) : (
      <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
    )}

    <p className="text-sm text-gray-500 mb-4">
      업로드 날짜: {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
    </p>

    {editMode ? (
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full text-lg mb-6 border p-2"
        rows={8}
      />
    ) : (
      <p className="text-lg mb-6">{lp.content}</p>
    )}

    <div className="flex gap-4">
      {isAuthor && (
        <>
          {editMode ? (
            <>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleUpdate}
              >
                ✅ 수정 완료
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setEditMode(false)}
              >
                ❌ 취소
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {
                  setEditMode(true);
                  setEditTitle(lp.title);
                  setEditContent(lp.content);
                }}
              >
                ✏️ 수정
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                🗑 삭제
              </button>
            </>
          )}
        </>
      )}

      <button
        onClick={isLiked ? handleDislikeLp : handleLikeLp}
        className={`px-4 py-2 rounded text-white ${
          isLiked ? "bg-gray-500 hover:bg-gray-600" : "bg-pink-500 hover:bg-pink-600"
        }`}
      >
        {isLiked ? "💔 좋아요 취소" : "❤️ 좋아요"} {lp.likes.length}
      </button>
    </div>

    <CommentSection lpId={lp.id} />
  </div>
);

};

export default LpDetailPage;*/
