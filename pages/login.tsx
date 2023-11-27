"use client";
import { appDispatch } from "@/store";
import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { login } from "@/store/user/thunks";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSnackbar } from "notistack";

interface LoginFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = ({ email, password }: LoginFormValues) => {
    setIsLoading(true);
    appDispatch(login({ email, password }))
      .unwrap()
      .catch(() => {
        enqueueSnackbar("Invalid email or password", { variant: "error" });
      })
      .finally(() => setIsLoading(false));
  };
  console.log(errors);

  return (
    <div className={"relative h-screen w-screen "}>
      <div
        className={
          "xxl:w-4/12 xs:w-10/12 absolute left-1/2 top-1/2 m-auto w-10/12 -translate-x-1/2 -translate-y-1/2 transform md:w-8/12 lg:w-4/12"
        }
      >
        <div className=" mb-4 mt-2 flex flex-col gap-2 rounded-md border border-gray-500 px-5 py-6 shadow-md lg:mb-0 lg:mt-0 lg:gap-4">
          <Typography variant={"h4"} className={"m-auto"}>
            Login
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={"flex flex-col gap-4"}
          >
            <Input
              error={!!errors.email}
              {...register("email", {
                required: true,
              })}
              label="Email"
              crossOrigin={"anonymous"}
            />
            <Input
              error={!!errors.password}
              {...register("password", {
                required: true,
              })}
              type={"password"}
              label="Password"
              crossOrigin={"anonymous"}
            />
            {isLoading ? (
              <div className={"flex items-center justify-center"}>
                <Spinner />
              </div>
            ) : (
              <Button type={"submit"} variant="filled" className={"w-full"}>
                Login
              </Button>
            )}
          </form>
        </div>
        <div className={"mt-2 flex justify-center"}>
          <Link href={"/register"}>
            <Button size={"sm"} variant={"text"}>
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps() {
  return {
    props: {
      isAuthPage: true,
    },
  };
}
