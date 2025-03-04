import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    } finally {
      // Clear input fields
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img
          className="w-20 mb-10"
          src="/images/speedx-removebg-preview.png"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl mb-2">What's your Email?</h3>
          <input
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          />
          <h3 className="text-xl mb-2">Enter Password</h3>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>
        </form>
        <p className="flex justify-center">
          New here?{' '}
          <Link to="/signup" className="text-blue-600">
            Create New Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#0ef023] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Sign-In as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
