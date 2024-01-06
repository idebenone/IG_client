import axios from "axios";

export const fetchExplorePosts = async () => {
  try {
    const posts = await axios.get("http://localhost:3000/post/explore");
    return posts.data;
  } catch (error) {
    console.log(error);
  }
};
