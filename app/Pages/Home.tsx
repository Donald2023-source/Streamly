'use client'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import Outlet from '../components/Outlet'
import axiosInstance from '../utils/axiosInstance'
import { useDispatch } from 'react-redux'
import { setBarnerData, setImageUrl } from '../Store/Streamlyslice'

const Home = () => {

    const dispatch = useDispatch()

    const fetchConfiguration = async() => {
        try {
            const response = await axiosInstance('configuration')
            console.log('Config', response)
            dispatch(setImageUrl(response.data.images.secure_base_url+"original"))
            console.log('I am response', response.data.images.secure_base_url+"original")
        } catch(err) {
            console.error(err)
        }
    }

    const fetchTrendingData = async() => {
        try {
          const response = await axiosInstance.get('trending/all/week');
    
          dispatch(setBarnerData(response.data.results))
    
          console.log('I am response', response.data.results)
        } catch(error) {
          console.error(error)
        }
      }
      

    useEffect(() =>{
        fetchConfiguration()
        fetchTrendingData()
    }, [])
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Home
