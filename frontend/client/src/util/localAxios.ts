import axios from "axios";

const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExMDgwNjk4LCJzdWIiOiJzaGFxODhAZGF1bS5uZXQiLCJyb2xlcyI6IlJPTEVfTk9UX0NFUlRJRklFRCJ9.vaLabNJyskgDWrwJFODM2g7PaZiTOpRRbZSIfMR10w8";

const LocalAxios = () => {

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVER_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      'Authorization': `Bearer ${token}`
    },
  });
  return instance;
};

export default LocalAxios;