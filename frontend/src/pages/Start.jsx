import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="bg-cover bg-center h-screen w-full flex flex-col justify-between pt-5 sm:pt-8 sm:px-6 lg:px-12 bg-[url('/images/homespeedx.jpg')]
    ">
            <img className='w-20 ml-8' src="/images/speedx-removebg-preview.png" alt="" />
            <div className=' py-5 pb-7 px-5'>
             <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left">Get Started with SpeedX</h2>
             <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded-xl mt-5 border border-white">Continue</Link>
            </div>
        </div>
  )
}

export default Start