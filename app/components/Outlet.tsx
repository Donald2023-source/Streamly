import React from "react";
import Card from "./Card";
import MobileNavigation from "./MobileNavigation";
const Outlet = () => {
  
  return (
    <div>
      <div className="md:pl-12 py-5">
        <Card isMovie={true} Heading="Top Tated" url="movie/top_rated" />
        <Card isMovie={false} Heading="Top TV Series" url="tv/top_rated" />
        <Card isMovie={true} Heading="Upcoming" url="movie/upcoming" />
        <Card isMovie={false} Heading="Tv Series Airing Today" url="tv/airing_today" />
      </div>
    </div>
  );
};

export default Outlet;
