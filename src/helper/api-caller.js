import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001";

export const get = async (path, params) => {
  return await axios
    .get(API_URL + path, {
      params,
      headers: {
        Authorization: `${localStorage.getItem("user")}`,
      },
    })
    .catch((e) => {
      console.log(e);
    });
};

export const post = async (path, body) => {
  return await axios
    .post(API_URL + path, body, {
      headers: {
        Authorization: `${localStorage.getItem("user")}`,
      },
    })
    .catch((e) => {
      console.log(e);
    });
};
