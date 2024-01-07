import axios from "axios";

import { loginType } from "@/types/authTypes";

export const login = async (data: loginType) => {
  try {
    const token = await axios.post("http://localhost:3001/auth/login", data);
    return token.data;
  } catch (error) {
    console.log(error);
  }
};
