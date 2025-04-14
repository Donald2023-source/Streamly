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
import { profile } from "console";
import { FaUser } from "react-icons/fa";
import user from "../../Assets/userimg.jpg"

interface movieDetails {
  title: string;
  backdrop_path: string;
  overview: string;
}

const Page = () => {
  const [details, setDetails] = useState<movieDetails | null>(null);
  const [crew, setCrew] = useState([]);
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
          <div className="absolute flex py-5 top-[75%] md:top-[85%] gap-4 left-10">
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

        <div className="md:px-10 px-4 py-2 text-sm md:text-lg font-semibold leading-7 md:leading-10">
          {details.overview}
        </div>

          <h2 className="md:px-10 px-5 font-bold text-gray-600 text-2xl py-4">Crew</h2>
        <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-5 gap-6  items-center justify-center">
          {crew.map(
            (
              item: { name: string; job: string; profile_path: string },
              idx
            ) => {
              return <div className="">
                <div className="flex gap-4 w-[16rem] items-center px-5 md:px-10 py-2 text-sm md:text-  font-semibold leading-6" key={idx}>
                  <Image
                    src={item.profile_path ? `${imageUrl}${item.profile_path}` : user}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="md:w-14 object-cover h-10 w-10 md:h-14 rounded-full"
                  />
                  <div>
                  <h2 className="font-semibold text-sm">{item?.name}</h2>
                  <p className="text-xs text-gray-400 font-semibold">{item?.job}</p>
                  </div>
                </div>
              </div>;
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
