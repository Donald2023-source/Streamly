"use client";

import { RootState } from "@/app/Store/store";
import axiosInstance from "@/app/utils/axiosInstance";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { CiPlay1 } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import user from "../../Assets/userimg.jpg";
import Card from "@/app/components/Card";
import EpisodeGrid from "@/app/components/EpisodeGrid";
import VideoPlayer from "@/app/components/VideoPlayer";
import useFetch from "@/app/Hooks/useFetch";

interface movieDetails {
  title: string;
  backdrop_path: string;
  overview: string;
  original_name: string;
}

interface tr {
  name: string;
  key: string;
}
const Page = () => {
  const [details, setDetails] = useState<movieDetails | null>(null);
  const [crew, setCrew] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState<any | null>(null);
  const [networks, setNetworks] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [videoDetail, setVideoDetail] = useState<any>(null);
  const params = useParams();

  const imageUrl = "http://image.tmdb.org/t/p/original";
  const { data: video } = useFetch(`/tv/${params?.id}/videos`);
  

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(`tv/${params.id}`);
      setDetails(response.data);
      setSeasons(response.data.seasons);
      console.log("data", response.data);
      setNetworks(response.data.networks);
      const firstValidSeason = response.data.seasons.find(
        (season: { season_number: number }) => season.season_number > 0
      );
      if (firstValidSeason) {
        setSelectedSeason(firstValidSeason.season_number);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCredits = async () => {
    try {
      const response = await axiosInstance.get(`tv/${params.id}/credits`);
      setCrew(response.data.cast);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = (id: string) => {
    setIsVisible((prev) => !prev);
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

  
  const selectedSeasonData: any = seasons.find(
    (season: { season_number: number; episode_count: number }) =>
      season.season_number === selectedSeason
  );

  const slicedNetworks = networks.slice(0, 5);

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

          <div className="absolute top-0 left-0 border-gray-900 rounded-lg border w-full h-full bg-gradient-to-t from-black to-black/40" />

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
        <div className="flex md:gap-12  md:flex-row flex-col py-7 items-start">
          <div className="md:pl-5 md:px-10 px-2 md:w-1/2 border">
            <h2 className="ml-4 md:ml-5 my-4 font-bold text-xl border-b-[1px] w-fit py-2">
              {details?.title || details?.original_name}
            </h2>
            <h2 className="pl-4 py-5 text-sm md:text-lg font-semibold leading-7 md:leading-10">
              {details?.overview}
            </h2>
            <div>
              {seasons.map((item: { spoken_languages: string }, idx) => (
                <div>{item?.spoken_languages}</div>
              ))}
            </div>
          </div>
          <div className="px-6 flex-1">
            <h2 className="text-lg font-bold">Seasons</h2>
            <div className="flex gap-5 flex-wrap">
              {seasons.map(
                (item: { season_number: number; name: string }, idx) =>
                  item.season_number > 0 && (
                    <div
                      key={`season-${idx}`}
                      className={`text-sm p-2 h-16 cursor-pointer transition-all hover:scale-105 my-4 flex items-center justify-center font-bold w-16 rounded-xl shadow-sm border ${
                        selectedSeason === item.season_number
                          ? "border-gray-800 shadow-primary hover:scale-105 hover:shadow-xl text-white bg-gradient-to-br from-primary/30 to-indigo-900/40"
                          : "border-gray-800 hover:shadow-xl"
                      }`}
                      onClick={() => setSelectedSeason(item.season_number)}
                    >
                      {item.season_number}
                    </div>
                  )
              )}
            </div>
            {selectedSeasonData && (
              <div>
                <h2 className="text-lg font-bold mt-4">Episodes</h2>
                <EpisodeGrid selectedSeasonData={selectedSeasonData} />
              </div>
            )}
          </div>
        </div>

        <div className="md:p-8 px-2 py-4">
          <h2 className="px-1 py-4 font-semibold md:text-xl text-lg text-gray-600">
            NETWORKS
          </h2>
          <div className="grid lg:grid-cols-8 md:grid-cols-5 grid-cols-3 gap-8 md:gap-4 ">
            {slicedNetworks.map((item: { logo_path: string }, idx) => (
              <div className="h-20 w-20 hover:scale-105 transition-all cursor-pointer rounded-full border border-gray-800 p-2">
                <Image
                  priority
                  className="h-full w-full object-contain"
                  width={500}
                  height={500}
                  src={`${imageUrl}${item?.logo_path}`}
                  alt="Image"
                />
              </div>
            ))}
          </div>
        </div>

        <h2 className="md:px-10 px-3 font-bold text-gray-600 text-2xl py-4">
          Cast
        </h2>
        <div className="flex overflow-auto gap-2 items-left justify-start">
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
          Heading="Recommendations"
          url={`tv/${params.id}/recommendations`}
        />
      </div>

      <div className="md:pl-5">
        <Card
          isMovie={true}
          Heading="Similar To This"
          url={`/tv/${params.id}/similar`}
        />
        <Card isMovie={true} Heading="Top Rated" url="/movie/popular" />
      </div>

      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <VideoPlayer name={video[1]?.name} videokey={video[1]?.key} />
      </div>
    </div>
  );
};

export default Page;
