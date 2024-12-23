'use client';

import { RootState } from '@/app/Store/store';
import axiosInstance from '@/app/utils/axiosInstance';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { CiPlay1 } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { Button } from '@/components/ui/button';
import { profile } from 'console';
import { FaUser } from 'react-icons/fa';


interface movieDetails {
  title: string,
  backdrop_path: string,
  overview: string
}


const Page = () => {
  const [details, setDetails] = useState<movieDetails | null>(null)
  const [crew, setCrew] = useState([])
  const params = useParams();

  const imageUrl = 'http://image.tmdb.org/t/p/original'

  const fetchDetails = async () => {
    try {
      const response = await axiosInstance.get(`movie/${params.id}`);
      setDetails(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCredits = async() => {
    try {
      const response = await axiosInstance.get(`movie/${params.id}/credits`)
      console.log(response.data.crew)
      setCrew(response.data.crew)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchDetails();
    fetchCredits()
  }, []);

  if (!details) {
    return <div className="text-white h-full w-full flex items-center">Loading...</div>;
  }



  return (
    <div className="text-white">
      <div className='relative'>
        <div className='md:py-20 py-32'>
          <Image
            src={`${imageUrl}${details.backdrop_path}`}
            alt={details.title || 'Movie'}
            width={800}
            height={450}
            className="object-cover w-full max-h-[500px]"
          />
        </div>

        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50' />
        <div className='absolute top-0 bottom-0 flex flex-col justify-end px-5 md:h-[80%]'>
          <h1 className="text-3xl font-bold">{details.title}</h1> 
          <div className='flex items-center space-x-4 py-3'>
            
            <Button className='py-5'>
              <CiPlay1/>  
              Play
              </Button>

            <Button className='py-5' color='none'>
              <SlTag/>
              Add Watchlist
              </Button>
          </div>
        </div>
      </div>
      
        <div>
          <div className='w-full'>
             <p className="mt-4 px-3 text-sm leading-relaxed">{details.overview}</p> 

            <div className='flex p-4 items-center gap-3 overflow-auto'>
            {
              crew?.map((item: {
                job: string,
                name: string,
                profile_path: string
                },
              idx) => {
                return (
                    <div key={idx}>
                      <div className='w-40 text-center flex gap-3 items-center'>
                      {
                        item.profile_path ?   
                        <Image className=' rounded-full' width={30} height={20} layout='' src={`${imageUrl}${item.profile_path}`} alt='sd'/>
                        : <FaUser className='w-[50px] py-3 rounded-full h-[50px]' />
                      }

                      <div>
                        <h2 className='text-sm'>{item.name}</h2>
                        <p className='text-xs text-gray-400'>{item.job}</p>
                      </div>
                    </div>
                    </div>
                )
              })
             }
            </div>
          </div>

          <div>
             
          </div>
        </div>
    </div>
  );
};

export default Page;
