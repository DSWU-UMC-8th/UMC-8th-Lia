import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T;
  validate: (valuesd: T) => Record<keyof T, string>;
}

function UseForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는 것것
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  //values가 변경될 때 마다 에러 검증 로직이 실행됨
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default UseForm;
