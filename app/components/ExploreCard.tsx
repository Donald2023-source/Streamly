import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";
import { RootState } from "../Store/store";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import CardSkeleton from "./SkeletonLoader";
import img1 from "@/app/Assets/fallback img.jpg";
const ExploreCard = ({ data, trending, index, media_type }: any) => {
  const imageURL = useSelector(
    (state: RootState) => state?.streamlyData.imageUrl,
  );

  const mediaType = data.media_type ?? media_type;
  return (
    <Link
      href={"/" + mediaType + "/" + data.id}
      className="min-w-[200px] hover:scale-105 transition-all duration-200 cursor-pointer h-[250px] relative rounded-xl overflow-hidden bg-gray-800"
    >
      {data ? (
        <div className="min-w-[200px] hover:scale-105 transition-all duration-200 cursor-pointer h-[250px] relative rounded-xl overflow-hidden bg-gray-800">
          <Image
            width={500}
            height={500}
            src={data.backdrop_path ? `${imageURL}${data.backdrop_path}` : img1}
            alt={data.title || "Movie poster"}
            className="object-cover w-full h-full"
          />
          <div className="text-white z-50 text-sm absolute top-0 bottom-8 w-full flex flex-col justify-end p-3 h-full">
            <h4 className="font-semibold line-clamp-1">
              {data?.title || data?.original_name}
            </h4>
            <div>
              <p className="flex gap-1">
                <FaStar className="text-yellow-300" />
                {data.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
          <div className="absolute bg-gradient-to-t from-black/60 to-black/10 w-full h-full top-0" />
        </div>
      ) : (
        <CardSkeleton />
      )}
    </Link>
  );
};

export default ExploreCard;
