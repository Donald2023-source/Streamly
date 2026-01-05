"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";

import { useDispatch } from "react-redux";
import DiscoverBarner from "../components/DiscoverBarner";
import Card from "../components/Card";
import useFetch from "../Hooks/useFetch";

interface genre {
  name: string;
}
const Home = () => {
  const dispatch = useDispatch();
  const { data } = useFetch("/genre/movie/list?language=en");
  console.log(data);
  return (
    <div className="absolute md:pl-12 py-4 top-24 left-0 right-0">
      {/* <DiscoverBarner /> */}
      <div className="pl-5">
        <h2 className="font-semibold text-white text-lg md:text-3xl py-3">
          Genres
        </h2>
        {data?.map((item: genre, idx: number) => (
          <span>{item?.name}</span>
        ))}
      </div>
      <div className=" py-5">
        <Card isMovie={true} Heading="Top Tated" url="movie/top_rated" />
        <Card isMovie={false} Heading="Top TV Series" url="tv/top_rated" />
        <Card isMovie={true} Heading="Upcoming" url="movie/upcoming" />
        <Card
          isMovie={false}
          Heading="Tv Series Airing Today"
          url="tv/airing_today"
        />
      </div>
    </div>
  );
};

export default Home;
