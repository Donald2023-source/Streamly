'use client'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import Outlet from '../components/Outlet'
import axiosInstance from '../utils/axiosInstance'
import { useDispatch } from 'react-redux'
import { setImageUrl } from '../Store/Streamlyslice'

const Home = () => {

    const dispatch = useDispatch()

    const fetchConfiguration = async() => {
        try {
            const response = await axiosInstance('configuration')
            console.log(response)
            dispatch(setImageUrl(response.data.images.secure_base_url+"original"))
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() =>{
        fetchConfiguration()
    }, [])
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Home
