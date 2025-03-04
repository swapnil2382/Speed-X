import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error registering user:', error.response?.data?.message || error.message);
    } finally {
      // Clear input fields
      setFirstName('');
      setLastName('');
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
          <h3 className="text-xl mb-2">What's your Name?</h3>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              required
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            />
            <input
              type="text"
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            />
          </div>
          <h3 className="text-xl mb-2">What's your Email?</h3>
          <input
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          />
          <h3 className="text-xl mb-2">Enter Password</h3>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
          >
            Sign-Up
          </button>
        </form>
        <p className="flex justify-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600">
            Login Here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-s flex justify-center">
          Your details are in safe hands!
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
