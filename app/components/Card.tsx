"use client";

import React, { useRef } from "react";
import useFetch from "../Hooks/useFetch";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "../Store/store";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import Link from "next/link";
import fallbackImage from "../Assets/userimg.jpg"; // Reuse your fallback image

type CardProps = {
  url: string;
  Heading: string;
  isMovie: boolean;
};

const Card: React.FC<CardProps> = ({ isMovie, Heading, url }) => {
  const { data } = useFetch(url);
  console.log(Heading, data);
  const imageUrl = useSelector(
    (state: RootState) => state.streamlyData.imageUrl
  );

  console.log("Image URL:", imageUrl);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className="p-3 m-2 relative">
      <h2 className="font-semibold text-white text-lg md:text-3xl py-3">
        {Heading}
      </h2>
      <div
        ref={containerRef}
        className="flex h-full min-w-screen-lg scroll-smooth overflow-x-scroll scrollbar-hide space-x-8"
      >
        {data &&
          data.length > 0 &&
          data.map(
            (
              item: {
                backdrop_path: string | null;
                title: string;
                vote_average: number;
                id: string;
                original_name: string;
              },
              idx: number
            ) => (
              <Link
                href={isMovie ? `/Movie/${item.id}` : `/tv/${item.id}`}
                key={idx}
              >
                <div className="min-w-[200px] hover:scale-105 transition-all duration-200 cursor-pointer h-[250px] relative rounded-xl overflow-hidden bg-gray-800">
                  <Image
                    width={500}
                    height={500}
                    src={
                      item.backdrop_path
                        ? `${imageUrl}${item.backdrop_path}`
                        : fallbackImage
                    }
                    alt={item.title || "Movie poster"}
                    className="object-cover w-full h-full"
                  />
                  <div className="text-white z-50 text-sm absolute top-0 bottom-8 w-full flex flex-col justify-end p-3 h-full">
                    <h4 className="font-semibold">
                      {item?.title || item?.original_name}
                    </h4>
                    <div>
                      <p className="flex gap-1">
                        <FaStar className="text-yellow-300" />
                        {item.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bg-gradient-to-t from-black/60 to-black/10 w-full h-full top-0" />
                </div>
              </Link>
            )
          )}
      </div>
      {/* Uncomment if you want navigation buttons back */}
      {/* <div className="flex absolute inset-32 left-0 right-0 w-full z-20 justify-between mt-4">
        <button onClick={handlePrev} className="text-white text-2xl cursor-pointer">
          <FaChevronLeft />
        </button>
        <button onClick={handleNext} className="text-white text-2xl cursor-pointer">
          <FaChevronRight />
        </button>
      </div> */}
    </div>
  );
};

export default Card;
