import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const useFetch = (endpoint: string) => {
    const [data, setData] = useState([]);
 

    const fetchData = async () => {
        try {
            
            const response = await axiosInstance.get(endpoint);
            setData(response.data.results); 
        } catch (error) {
            console.error('Error', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]); 
    return { data };
};

export default useFetch;