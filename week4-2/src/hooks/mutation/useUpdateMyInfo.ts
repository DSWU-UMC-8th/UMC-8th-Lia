

/*import { useMutation } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useUpdateMyInfo() {
  return useMutation({
    mutationFn: updateMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default useUpdateMyInfo;*/

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../../context/AuthContext";
import { patchMyInfo } from "../../apis/auth";

const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: patchMyInfo,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });
      const previous = queryClient.getQueryData(["myInfo"]);

      // ✅ 낙관적으로 context의 사용자 정보 업데이트
      setUser((prev) =>
        prev ? { ...prev, name: newData.name, bio: newData.bio, avatar: newData.avatar } : prev
      );

      queryClient.setQueryData(["myInfo"], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: {
            ...old.data,
            name: newData.name,
            bio: newData.bio,
            avatar: newData.avatar,
          },
        };
      });

      return { previous };
    },
    onError: (_err, _newData, context) => {
      // 🔄 실패하면 롤백
      queryClient.setQueryData(["myInfo"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
};

export default useUpdateMyInfo;

