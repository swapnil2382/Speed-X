import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [vehicleColor, setVehicleColor] = useState('')
const [vehiclePlate, setVehiclePlate ] = useState('')
const [vehicleCapacity, setVehicleCapacity] = useState('')
const [vehicleType, setVehicleType] = useState('')


const { captain, setCaptain } =React.useContext(CaptainDataContext)


const submitHandler = async (e) => {
  e.preventDefault();
  const captainData = {
      fullname: {
          firstname: firstName,
          lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType,
      },
  };

  try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if (response.status === 201) {
          const data = response.data;
          setCaptain(data.captain);
          localStorage.setItem('token', data.token);
          navigate('/captain-home');
      }
  } catch (error) {
      if (error.response) {
          console.error("Error Response:", error.response.data); // Backend error response
          alert(error.response.data.message || 'Registration failed.');
      } else if (error.request) {
          console.error("Error Request:", error.request); // Request sent but no response
          alert('No response from server. Please check your backend.');
      } else {
          console.error("Error:", error.message); // Other errors
          alert('An error occurred. Please try again later.');
      }
  }
};





  return (
  
        <div>
      <div className='p-7 flex h-screen flex-col justify-between'>
     
     <div>
     <img className='w-20 mb-10' src="/images/speedx-removebg-preview.png" alt="" />
     <form onSubmit={(e)=>{
      submitHandler(e)}}>
        <h3 className='text-lg mb-2'>What's your Name</h3>
        <div className='flex gap-4 mb-6'>
        <input 
        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-sm ' 
        type="text" required placeholder='First-name' 
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}
        />
        <input 
        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-sm  ' 
        type="text" required placeholder='Last-name'
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}
        />
        
        </div>
        <h3 className='text-lg mb-2'>Vehicle Information</h3>
        <div className='flex gap-4 mb-6'>
        <input 
        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-sm ' 
        type="text" required placeholder='Vehicle Color' 
        value={vehicleColor}
        onChange={(e)=>setVehicleColor(e.target.value)}
        />
        <input 
        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-sm  ' 
        type="text" required placeholder='Vehicle Plate'
        value={vehiclePlate}
        onChange={(e)=>setVehiclePlate(e.target.value)}
        />
        </div>
        <div className='flex gap-4 mb-6'>
        <input 
        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-sm ' 
        type="number" required placeholder='Vehicle Capacity' 
        value={vehicleCapacity}
        onChange={(e)=>setVehicleCapacity(e.target.value)}
        />
        <select 
        required
        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg'
        value={vehicleType}
        onChange={(e)=>setVehicleType(e.target.value)}
        >
          <option value="" disabled>Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="auto">Auto</option>
          <option value="motorcycle">Motorcycle</option>
        </select>
        </div>
        <h3 className='text-lg mb-2'>What's your Email</h3>
        <input 
        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm  ' 
        type="email" required placeholder='email@example.com' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <h3 className='text-lg mb-2'>Enter Password</h3>
        <input
        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm ' 
        type="password" required placeholder='password' 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg ' >Sign-Up</button>
      </form>
      <p className=' flex justify-center'>Already Registered? <Link to='/captain-login' className='text-blue-600'> Login Here</Link></p>
     </div>
     <div>
     <p className='text-xs flex justify-center'>Enjoy! and Run your Bussiness  faster with us!</p>
     </div>
    </div>
    </div>
    
  )
}

export default CaptainSignup