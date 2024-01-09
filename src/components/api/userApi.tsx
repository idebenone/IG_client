import axios from "axios";
import { fetchToken } from "./storageApi";

export const getProfile = async () => {
  try {
    const response = await axios.get("http://localhost:3001/user", {
      headers: {
        "x-access-token": fetchToken().toString(),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/search?query=${query}`,
      {
        headers: {
          "x-access-token": fetchToken().toString(),
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = async (data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/user/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": fetchToken().toString(),
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
