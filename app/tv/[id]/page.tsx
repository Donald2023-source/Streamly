"use client";

import { RootState } from "@/app/Store/store";
import axiosInstance from "@/app/utils/axiosInstance";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { CiPlay1 } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import user from "../../Assets/userimg.jpg";
import Card from "@/app/components/Card";

interface movieDetails {
  title: string;
  backdrop_path: string;
  overview: string;
  original_name: string;
}

const Page = () => {
  const [details, setDetails] = useState<movieDetails | null>(null);
  const [crew, setCrew] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [epsiode, setEpisode] = useState(0);
  const params = useParams();

  const imageUrl = "http://image.tmdb.org/t/p/original";

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(`tv/${params.id}`);
      setDetails(response.data);
      console.log(response.data);
      setSeasons(response.data.seasons);
      console.log("I am response", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCredits = async () => {
    try {
      const response = await axiosInstance.get(`tv/${params.id}/credits`);
      console.log(response.data.cast);
      setCrew(response.data.cast);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchCredits();
  }, []);

  if (!details) {
    return (
      <div className="text-white h-full w-full flex items-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="relative">
          <Image
            src={`${imageUrl}${details.backdrop_path}`}
            alt={details.title || "Movie Poster"}
            width={1000}
            height={1000}
            className="w-full rounded-b-lg pt-1 md:h-[80vh] h-[400px] object-cover"
          />

          <div className="absolute top-0 left-0 border-gray-900 rounded-lg border w-full h-full bg-gradient-to-b  from-black/80 to-black" />

          <div className="absolute w-fit flex py-5 top-[75%] md:top-[65%] lg:top-[80%] gap-4 left-3 md:left-10">
            <Button className="font-semibold py-6 px-10 text-md bg-primary hover:scale-105 transition-all">
              <CiPlay1 className="text-2xl" /> Play
            </Button>
            <Button className="font-semibold py-6 px-10 text-md bg-primary hover:scale-105 transition-all">
              <SlTag className="text-2xl" /> Wishlist
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex md:gap-12 py-7  items-center">
          <div className="md:pl-5 px-10 md:w-1/2">
            <h2 className="ml-4 md:ml-5 my-4 font-bold text-lg border-b-[1px] w-fit py-2">
              {details?.title || details?.original_name}
            </h2>
            <h2 className=" pl-4 py-5 text-sm md:text-lg font-semibold leading-7 md:leading-10">
              {details?.overview}
            </h2>
          </div>
          <div>
            <h2 className="text-lg font-bold">Seasons</h2>
            <h2 className="flex gap-5 flex-wrap">
              {seasons.map(
                (item: { season_number: number; name: string }, idx) =>
                  item.season_number > 0 && (
                    <div key={idx} className="">
                      <h2 className="text-sm p-2 h-16 hover:shadow-xl cursor-pointer transition-all hover:scale-105 my-4 flex items-center justify-center font-bold w-16 rounded-xl shadow-sm border border-gray-800 shadow-primary">
                        {item.season_number}
                      </h2>
                    </div>
                  )
              )}
            </h2>
            {seasons.map((item: { episode_count: number }, idx) => (
              <div key={idx}>
                <div>
                  <h2 className="grid lg:grid-cols-6 gap-4">
                    {Array.from({ length: item?.episode_count }, (_, i) => (
                      <div
                        key={i}
                        className="h-20 my-2 w-24 px-3 py-8 text-sm font-semibold text-white bg-gray-900 rounded-lg shadow-md"
                      >
                        Episode {i + 1}
                      </div>
                    ))}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="md:px-10 px-3 font-bold text-gray-600 text-2xl py-4">
          Cast
        </h2>
        <div className="flex overflow-auto gap-2 items-left justify-start ">
          {crew.map(
            (
              item: { name: string; character: string; profile_path: string },
              idx: number
            ) => (
              <div key={idx}>
                <div className="flex flex-col gap-4 md:w-64 w-32 items-center px-3 md:px-10 py-2 text-sm font-semibold leading-6">
                  <Image
                    src={
                      item.profile_path
                        ? `${imageUrl}${item.profile_path}`
                        : user
                    }
                    alt={"image"}
                    width={100}
                    height={100}
                    className="rounded-lg md:h-64 object-cover w-32 h-32 md:w-72"
                    priority
                  />
                  <div className="text-center">
                    <h2 className="font-semibold text-xs">{item?.name}</h2>
                    <p className="text-xs text-gray-400 font-semibold">
                      {item?.character}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="md:pl-5">
        <Card
          isMovie={true}
          Heading="Similar To This"
          url={`/tv/${params.id}/similar`}
        />
      </div>

      <div className="md:pl-5">
        <Card isMovie={true} Heading="Top Rated" url="/movie/popular" />
      </div>
    </div>
  );
};

export default Page;
