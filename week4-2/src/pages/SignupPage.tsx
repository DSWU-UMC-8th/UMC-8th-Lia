import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

// zod 스키마
const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    passwordCheck: z.string(),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");

  const isEmailValid = !errors.email && email;
  const isPasswordValid =
    !errors.password && !errors.passwordCheck && password === passwordCheck;
  const isNameValid = !errors.name && name;

  const onSubmit = async (data: FormFields) => {
    const { passwordCheck, ...rest } = data;
    try {
      const response = await postSignup({
        ...rest,
        bio1: "",
        bio2: "",
        avatar: "",
      });
      alert("회원가입 완료!");
      console.log(response);
    } catch (err) {
      alert("회원가입 실패");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center space-y-6">
        <h2 className="text-2xl font-bold">회원가입</h2>

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <input
              {...register("email")}
              type="email"
              placeholder="이메일"
              className="p-2 rounded border border-gray-300 bg-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              type="button"
              disabled={!isEmailValid}
              onClick={() => setStep(2)}
              className="bg-pink-500 text-white py-2 rounded disabled:bg-gray-300"
            >
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-base text-gray-500">✉️{email}</p>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                className="w-full p-2 rounded border border-gray-300 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-2 text-sm"
              >
              </button>
            </div>
            <div className="relative">
              <input
                {...register("passwordCheck")}
                type={showPasswordCheck ? "text" : "password"}
                placeholder="비밀번호 확인"
                className="w-full p-2 rounded border border-gray-300 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCheck((prev) => !prev)}
                className="absolute right-2 top-2 text-sm"
              >
              </button>
            </div>
            {(errors.password || errors.passwordCheck) && (
              <p className="text-red-500 text-sm">
                {errors.password?.message || errors.passwordCheck?.message}
              </p>
            )}
            <button
              type="button"
              disabled={!isPasswordValid}
              onClick={() => setStep(3)}
              className="bg-pink-500 text-white py-2 rounded disabled:bg-gray-300"
            >
              다음
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* 프로필 이미지 UI */}
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl text-gray-600">👤</span>
            </div>
            <input
              {...register("name")}
              placeholder="닉네임"
              className="p-2 rounded border border-gray-300 bg-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <button
              type="submit"
              disabled={!isNameValid}
              className="bg-pink-500 text-white py-2 rounded disabled:bg-gray-300"
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
