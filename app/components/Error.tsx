import React from 'react'
import error from '@/app/Assets/Error.png'
import Image from 'next/image'
const Error = () => {
  return (
    <div>
        <Image className='' src={error} alt="An error occured"/>
    </div>
  )
}

export default Error
