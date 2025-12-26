"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import Outlet from "../components/Outlet";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import {
  setAccountId,
  setBarnerData,
  setImageUrl,
  setTmdKey,
} from "../Store/Streamlyslice";

const Home = () => {
  const dispatch = useDispatch();

  const fetchConfiguration = async () => {
    try {
      const response = await axiosInstance("configuration");
      console.log("Config", response);
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
      console.log(
        "I am response",
        response.data.images.secure_base_url + "original"
      );
      dispatch(setTmdKey(process.env.NEXT_PUBLIC_TMDB_KEY));
      dispatch(setAccountId(process.env.NEXT_PUBLIC_TMD_ACCOUNT_ID));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrendingData = async () => {
    try {
      const response = await axiosInstance.get("trending/all/week");

      dispatch(setBarnerData(response.data.results));

      console.log("I am response", response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConfiguration();
    fetchTrendingData();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;
