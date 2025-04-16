"use client";
import React, { useState } from "react";

interface Props {
    selectedSeasonData: {
        episode_count: number;
    };
}
const EpisodeGrid = ({ selectedSeasonData }: Props) => {
  const [visibleEpisodes, setVisibleEpisodes] = useState(6);
  const episodesPerLoad = 6;
  const totalEpisodes = selectedSeasonData?.episode_count || 0;

  const handleShowMore = () => {
    setVisibleEpisodes((prev) =>
      prev >= totalEpisodes ? episodesPerLoad : totalEpisodes
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-3 gap-8 md:gap-4">
        {Array.from(
          { length: Math.min(visibleEpisodes, totalEpisodes) },
          (_, i) => (
            <div
              key={`episode-${i}`}
              className="h-20 my-2 w-24 px-3 py-8 text-sm font-semibold text-white bg-gray-900 rounded-lg shadow-md flex items-center justify-center"
            >
              Episode {i + 1}
            </div>
          )
        )}
      </div>
      
        <button
          onClick={handleShowMore}
          className="mt-6 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {
            visibleEpisodes != 0 && visibleEpisodes ? "Hide" : "Show All"
              
          }
        </button>
      
    </div>
  );
};

export default EpisodeGrid;
