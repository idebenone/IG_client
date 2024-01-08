import { NewPost } from "@/types/postTypes";
import axios from "axios";
import { fetchToken } from "./storageApi";

export const fetchExplorePosts = async () => {
  try {
    const posts = await axios.get("http://localhost:3001/post/explore");
    return posts.data;
  } catch (error) {
    console.log(error);
  }
};

export const newPost = async (data: NewPost) => {
  try {
    const response = await axios.post("http://localhost:3001/user/post", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": fetchToken().toString(),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
