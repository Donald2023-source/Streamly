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

interface movieDetails {
  title: string;
  backdrop_path: string;
  overview: string;
}

const Page = () => {
  const [details, setDetails] = useState<movieDetails | null>(null);
  const [crew, setCrew] = useState([]);
  const [showAllCrew, setShowAllCrew] = useState(false);
  const params = useParams();

  const imageUrl = "http://image.tmdb.org/t/p/original";

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(`movie/${params.id}`);
      setDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCredits = async () => {
    try {
      const response = await axiosInstance.get(`movie/${params.id}/credits`);
      console.log(response.data.crew);
      setCrew(response.data.crew);
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

  const displayedCrew = showAllCrew ? crew : crew.slice(0, 5);

  return (
    <div>
      <div>
        <div className="relative">
          <Image
            src={`${imageUrl}${details.backdrop_path}`}
            alt={details.title}
            width={1000}
            height={1000}
            className="w-full pt-1 md:h-full h-[400px] object-cover"
          />
          <div className="absolute w-fit flex py-5 top-[75%] md:top-[85%] gap-4 left-3 md:left-10">
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
        <div className="md:px-10 px-3 py-2 text-sm md:text-lg font-semibold leading-7 md:leading-10">
          {details.overview}
        </div>

        <h2 className="md:px-10 px-3 font-bold text-gray-600 text-2xl py-4">Crew</h2>
        <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-5 gap-6 items-center justify-center">
          {displayedCrew.map(
            (
              item: { name: string; job: string; profile_path: string },
              idx: number
            ) => (
              <div key={idx}>
                <div className="flex gap-4 md:w-[16rem] w-52 items-center px-3 md:px-10 py-2 text-sm font-semibold leading-6">
                  <Image
                    src={item.profile_path ? `${imageUrl}${item.profile_path}` : user}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="md:w-14 object-cover h-10 w-10 md:h-14 rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold text-xs">{item?.name}</h2>
                    <p className="text-xs text-gray-400 font-semibold">{item?.job}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {crew.length > 5 && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setShowAllCrew(!showAllCrew)}
              className="font-semibold py-4 px-8 text-md bg-primary hover:scale-105 transition-all"
            >
              {showAllCrew ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;