import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { captain , setCaptain} = React.useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) =>{
       e.preventDefault();
      const captain ={
        email: email,
        password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);


if(response.status === 200) {
  const data = response.data
  setCaptain(data.captain)
  localStorage.setItem('token', data.token)  
  navigate('/captain-home') 
}

       setEmail('')
       setPassword('')
    }

  return (
    <div className='p-7 flex h-screen flex-col justify-between'>
     
    <div>
    <img className='w-20 mb-10' src="/images/speedx-removebg-preview.png" alt="" />
    <form onSubmit={(e)=>{
     submitHandler(e)}}>
       <h3 className='text-xl mb-2'>What's your Email</h3>
       <input 
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm  ' 
       type="email" required placeholder='email@example.com' />
       <h3 className='text-xl mb-2'>Enter Password</h3>
       <input
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm ' 
       type="password" required placeholder='password' />
       <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg ' >Login</button>
     </form>
     <p>Boost your earnings with us! <Link to='/Captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
    </div>
    <div>
    <Link to='/login' className='bg-[#f5bb20] flex item-center justify-center text-white font-semibold mb-5 rounded px-4  py-2  w-full text-lg ' >Sign-In as User</Link>
    </div>
   </div>
  )
}

export default Captainlogin