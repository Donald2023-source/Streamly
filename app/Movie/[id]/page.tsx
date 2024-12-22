'use client';


import { RootState } from '@/app/Store/store';
import axiosInstance from '@/app/utils/axiosInstance';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const Page = () => {
  const [details, setDetails] = useState<any | null>(null);
  const params = useParams();

  const imageUrl = useSelector((state: RootState) => state.streamlyData.imageUrl);

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(`movie/${params.id}`);
      setDetails(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!details) {
    return <div className="text-white">Loading...</div>;
  }

  console.log(`${imageUrl}${details.backdrop_path}`)

  return (
    <div className="text-white">
      <div className=''>
        <Image
          src={`${imageUrl}${details.backdrop_path}`}
          alt={details.title || 'Movie'}
          width={800}
          height={450}
          className="rounded-lg object-cover w-full max-h-[500px]"
        />
        <h1 className="text-3xl font-bold">{details.title}</h1>
        <p className="mt-4">{details.overview}</p>
      </div>
    </div>
  );
};

export default Page;
