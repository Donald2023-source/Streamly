"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import Image from "next/image";
import Card from "./Card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DiscoverBarner = () => {
  const barnerData = useSelector(
    (state: RootState) => state.streamlyData.barnerData
  );
  const imageUrl = useSelector(
    (state: RootState) => state.streamlyData.imageUrl
  );
  const [currentImage, setCurrentImage] = useState(0);

  // console.log("Image URL:", imageUrl);
  // console.log("Barner Data:", barnerData);

  useEffect(() => {
    if (!barnerData.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % barnerData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [barnerData.length]);

  return (
    <section className="w-full h-full overflow-hidden relative">
      <div>
        <div
          className="flex transition-transform duration-1000  ease-in-out"
          style={{
            transform: `translateX(-${currentImage * 100}%)`,
            opacity: 0.4,
          }}
        >
          {barnerData.length > 0 ? (
            barnerData.map(
              (
                data: {
                  backdrop_path: string;
                  id: number;
                  original_title: string;
                  overview: string;
                  name: string;
                },
                index: any
              ) => (
                <div
                  key={index}
                  className="w-full h-[450px] lg:h-[95vh] relative flex-shrink-0"
                >
                  <Image
                    src={`${imageUrl}${data.backdrop_path}`}
                    alt={`Barner Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    quality={80}
                    priority={index === currentImage}
                  />
                </div>
              )
            )
          ) : (
            <div className="font-bold text-5xl text-center absolute">
              Loading...
            </div>
          )}
        </div>
        <div className="absolute inset-0 h-full flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold">Discover</h2>
          <p className="w-[45%] text-center leading-7 text-gray-300 mt-8">
            Streamly will help you discover amazing content tailored to your
            preferences. With our extensive collection of thousands of movies
            and TV shows across multiple genres, you'll find something perfect
            for every mood and occasion. Whether you're looking for blockbuster
            action, heartwarming dramas, thrilling mysteries, or laugh-out-loud
            comedies, our intelligent recommendations will guide you to your
            next favorite title. We're excited to have you here and can't wait
            to enhance your entertainment journey with us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiscoverBarner;
