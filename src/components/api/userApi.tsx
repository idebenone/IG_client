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

export const getOtherProfiles = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/profile/${id}`,
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

export const followUser = async (id: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/user/follow/${id}`,
      {},
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

export const unfollowUser = async (id: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/user/unfollow/${id}`,
      {},
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

export const addComment = async (data: any) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/user/comment`,
      data,
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

export const getComments = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/comment/${id}`,
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

export const likePost = async (data: any) => {
  try {
    const response = await axios.post(`http://localhost:3001/user/like`, data, {
      headers: {
        "x-access-token": fetchToken().toString(),
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = async (data: any) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/user/unlike`,
      data,
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

export const getFollowers = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/followers/${id}`,
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

export const getFollowing = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/user/following/${id}`,
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

export const getFollowersSearch = async (query: string, id: string) => {
  // try {
  //   const response = await axios.get(
  //     `http://localhost:3001/user/follower/search/${id}?query=${query}`,
  //     {
  //       headers: {
  //         "x-access-token": fetchToken().toString(),
  //       },
  //     }
  //   );
  //   return response;
  // } catch (error) {
  //   console.log(error);
  // }
};
