"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";

import { useDispatch } from "react-redux";
import DiscoverBarner from "../components/DiscoverBarner";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <DiscoverBarner />

    </div>
  );
};

export default Home;
