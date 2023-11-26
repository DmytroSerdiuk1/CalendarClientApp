import React, { FC, useEffect } from "react";
import { RootState, appDispatch } from "@/store";
import { checkUserExist } from "@/store/user/thunks";
import { useSelector } from "react-redux";

import { useRouter } from "next/router";

const AuthProvider: FC<{
  children: React.ReactNode;
  pageProps: { isAuthPage: boolean; isProtected: boolean };
}> = ({ pageProps, children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const refreshToken =
    typeof window !== "undefined" && localStorage.getItem("refreshToken");

  useEffect(() => {
    if (!user && accessToken && pageProps.isProtected) {
      appDispatch(checkUserExist());
    } else if (!user && !accessToken && pageProps.isProtected) {
      router.push("/login");
    }
    if (accessToken && pageProps.isAuthPage) {
      router.push("/");
    }
  }, [user, accessToken, refreshToken, pageProps, router]);

  return <>{children}</>;
};

export default AuthProvider;
