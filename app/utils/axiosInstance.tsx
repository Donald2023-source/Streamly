import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4ZWQ4YmY3YTZkYmRlMjIzYWI5NTQyNzgzNTVlYiIsIm5iZiI6MTcyNjc1MzA5MS43NjgsInN1YiI6IjY2ZWMyOTQzZTQzZjA3ZGU4MmViYTY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r0RgL1oivGzyg0J3XSYiSQn_57VNud9Ug3iEfk_7j7M',
        'accept': 'application/json'
    }
});
export default axiosInstance

