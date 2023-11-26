"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "@/service/axios";
import { UserData } from "@/types/UserData";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: UserData) => {
    return await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/sign-in`, { email, password })
      .then((res) => {
        return res.data;
      });
  },
);

export const register = createAsyncThunk(
  "user/register",
  async ({ firstName, lastName, email, password }: UserData) => {
    return await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/sign-up`, {
        email,
        password,
        firstName,
        lastName,
      })
      .then((res) => {
        return res.data;
      });
  },
);
export const checkUserExist = createAsyncThunk(
  "user/checkUserExist",
  async () => {
    return await axiosInstance.post("/check-user-exist").then((res) => {
      return res.data;
    });
  },
);
