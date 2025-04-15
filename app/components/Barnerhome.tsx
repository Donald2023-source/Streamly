'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import Image from 'next/image';
import Card from './Card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Barnerhome = () => {
  const barnerData = useSelector((state: RootState) => state.streamlyData.barnerData);
  const imageUrl = useSelector((state: RootState) => state.streamlyData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);

  console.log('Image URL:', imageUrl);
  console.log('Barner Data:', barnerData);

  useEffect(() => {
    if (!barnerData.length) return; 

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % barnerData.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, [barnerData.length]);

  return (
    <section className="w-full h-full overflow-hidden relative">
      <div className="flex transition-transform duration-1000  ease-in-out" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
        {barnerData.length > 0 ? (
             barnerData.map((data: { backdrop_path: string, id: number, original_title: string, overview: string, name: string}, index) => (
              <div key={index} className="w-full h-[450px] lg:h-[95vh] relative flex-shrink-0">
                <Image
                  src={`${imageUrl}${data.backdrop_path}`}
                  alt={`Barner Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                  priority={index === currentImage}
                />
                <div className='bg-black/60 absolute md:px-16 px-2 h-full w-full'>
                  <div className='relative top-0 flex flex-col justify-end py-10 px-3 h-full text-white'>
                    <h2 className='font-bold text-2xl py-2'>{data.name || data.original_title}</h2>
                    <p className='text-sm md:w-[60%] lg:text-lg text-gray-400 line-clamp-3'>{data.overview}</p>
                     <span className='flex gap-5'>
                     <div className='flex gap-4 pt-4'>
                       
                     <Link href={`/movie/${data?.id}`} className='bg-[#ffffff2a] py-2 px-10 hover:bg-primary transition-all rounded backdrop-blur-md'>View</Link >
                      <button className='bg-[#ffffff2a] py-2 px-8 rounded backdrop-blur-md'>Wishlist</button>
                     </div>
                      
                     </span>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className='font-bold text-5xl text-center absolute'>Loading...</div>
        )}
       
      </div>

    </section>
  );
};

export default Barnerhome;
