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
     </div>
    </section>
  );
};

export default DiscoverBarner;
