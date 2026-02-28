"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Card from "../components/Card";
import ExploreCard from "../components/ExploreCard";
import axiosInstance from "../utils/axiosInstance";
import useFetch from "../Hooks/useFetch";

const Page = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const params = useParams();
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/discover/movie`, {
        params: {
          page: pageNumber,
        },
      });

      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      setTotalPageNo(response.data.total_pages);
      console.log("explore:", response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(0);
    setData([]);
    fetchData();
  }, [params.explore]);

  const fetchGenres = async () => {
    try {
      const data = await axiosInstance.get("/genre/movie/list");
      console.log(data.data?.genres);
      setGenres(data?.data?.genres);
    } catch (error: unknown | Error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  return (
    <div className="py-14 absolute md:top-10 left-0 md:px-12 px-5 right-0">
      <div className="container mx-auto">
        <span className="flex flex-col items-center justify-center text-center my-5">
          <h3 className="capitalize text-xl font-semibold my-2">Discover</h3>
          <p>
            Here's room for you to discover a lot of genres. You get to discover
            endless list of premium entertaining content
          </p>
        </span>

        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 justify-center gap-10 lg:justify-start">
          {data.map((exploreData, index) => {
            return (
              <ExploreCard
                data={exploreData}
                key={index}
                media_type={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
