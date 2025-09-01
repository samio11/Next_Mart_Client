"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return res.json();
  } catch (err: any) {
    return err;
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    if (result.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
    }
    return result;
  } catch (err) {
    return err;
  }
};

export const getUserInfo = async () => {
  const accessToken = (await cookies()).get("accessToken")!.value;
  let decoded = null;
  if (accessToken) {
    decoded = await jwtDecode(accessToken);
    return decoded;
  } else {
    return null;
  }
};
