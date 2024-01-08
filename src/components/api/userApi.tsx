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

// try {
//     const response = await axios.post("http://localhost:3001/user", data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "x-access-token": fetchToken().toString(),
//       },
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
