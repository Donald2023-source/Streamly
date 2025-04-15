import React from 'react'
import Card from './Card'
const Outlet = () => {
  return (
    <div>
      <div className='md:pl-12 py-5'>
      <Card Heading='Top Tated' url='movie/top_rated'/>
      </div>
    </div>
  )
}

export default Outlet
