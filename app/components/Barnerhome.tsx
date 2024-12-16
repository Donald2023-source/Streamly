'use client'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import axios from 'axios'
import Image from 'next/image'
const Barnerhome = () => {
    
    const [image, setImage] = useState('')
    const fetchConfiguration = async () => {
        try {
          const response = await axiosInstance.get('/configuration')
    
          setImage(response.data.images.secure_base_url+"original")
          console.log('Config', response)
        } catch(err) {
          console.error(err)
        }
      }

    useEffect(() => {
        fetchConfiguration()
    }, fetchConfiguration)
  return (
    <div>
        <Image width={100} height={100} src={image} alt='Barner'/>
    </div>
  )
}

export default Barnerhome
