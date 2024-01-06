import axios from "axios";

export const shortrInstance = axios.create({
  baseURL: "https://shortr.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
