import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ButtonHighlight } from "../../../styles/components/buttons/buttonHiglight";
import { InputIcon } from "../../../styles/components/inputs/authInput";
import Image from "next/image";
import { SignInBtn } from "../../../styles/pages/signinStyles";
import { ErrorStyle } from "../../../styles/components/Error";
import { handleSignin } from "../../../redux/actions/auth/signin";
import FormController from "../../../component/formHandler/formController";
import { RootState } from "../../../redux/reducers";
import { useRouter } from "next/router";

// export interface IsignInForm {
//   username: string;
//   password: string;
// }
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(handleSignin(data));
    console.log(data);
  };
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    33;
    setVisibility(!visibility);
  };

  const { data, loading, error } = useSelector(
    (state: RootState) => state.signin
  );
  const router = useRouter();

  const alert = () => {
    if (data?.status) {
      router.push("/onboarding/welcome");
      // toast.success(data && data?.data?.message, { autoClose: 4000 });
    } else if (error.status) {
      toast.warn(error && error?.data?.data?.message, { autoClose: 4000 });
    }
  };
  console.log(data, "loading");
  useEffect(() => {
    if (!loading) {
      alert();
    }
  }, [data, error.status]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormController
        control="input"
        defaultValue="test"
        label="username"
        name="username"
        register={register}
        border={errors.username && "1px solid red"}
        required={true}
      />
      {errors.username && <ErrorStyle>This field is required</ErrorStyle>}

      <FormController
        control="input"
        defaultValue="test"
        label="password"
        name="password"
        type={visibility ? "text" : "password"}
        border={errors.password && "1px solid red"}
        register={register}
        required
      >
        <InputIcon onClick={toggleVisibility}>
          <Image src={"/svgs/eye.svg"} width={25} height={25} alt="eye" />
        </InputIcon>
      </FormController>

      {errors.password && <ErrorStyle>This field is required</ErrorStyle>}

      <SignInBtn>
        <ButtonHighlight type="submit">submit </ButtonHighlight>
      </SignInBtn>
    </form>
  );
}
