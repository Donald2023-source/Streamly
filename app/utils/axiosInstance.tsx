import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    accept: "application/json",
  },
});
export default axiosInstance;
