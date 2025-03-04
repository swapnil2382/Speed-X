import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({children}) => {

const token = localStorage.getItem('token')
const navigate = useNavigate()
const { captain, setUser} = useContext(UserContext)
const [ isLoading, setIsLoading] = useState(true)


useEffect(() => {
    if (!token){
        navigate('/login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response.status === 200){
            setUser(response.data.captain)
            setIsLoading(false)
        }
      })
      .catch((error) => {
        console.error('Failed to get captain profile:', error.message)
        localStorage.removeItem('token')
        navigate('/login')
      })
        
    
  }, [token ])

  if (isLoading){
    return(
        <div>Loading...</div>
    )
}

  return (
    <>{children}</>
  )

}
export default UserProtectWrapper