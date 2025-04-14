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
    <div className="text-white">
      <div className="relative h-full">
        <div className="md:py-20 relative py-32">
          <Image
            src={`${imageUrl}${details.backdrop_path}`}
            alt={details.title || "Movie"}
            width={800}
            height={600}
            className="object-cover absolute top-0 w-full max-h-[70vh] md:max-h-[95vh]"
          />
        </div>

          <div className="absolute top-0 bottom-32 left-0 w-full h-full bg-gradient-to-t from-black to-transparent">
          <Button>
            <CiPlay1 /> Play
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default Page;
