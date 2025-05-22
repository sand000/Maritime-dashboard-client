import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/registerUser`, formData);
      if (response.data) {
        alert("User created successfully");
        navigate("/");
      } else {
        alert("User registration failed");
      }
    } catch (error) {
      console.error("SignUp error:", error);
      alert("Error creating user");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white w-full max-w-md p-8 rounded-2xl shadow-lg'>
        <h1 className='text-3xl font-bold text-center text-blue-700 mb-6'>Create Account</h1>

        <form onSubmit={handleFormSubmit} className='flex flex-col gap-4'>
          <input
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type='text'
            name='name'
            value={formData.name}
            placeholder='Full Name'
            onChange={handleFormChange}
            required
          />
          <input
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type='number'
            name='age'
            value={formData.age}
            placeholder='Age'
            onChange={handleFormChange}
            required
          />
          <input
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type='email'
            name='email'
            value={formData.email}
            placeholder='Email'
            onChange={handleFormChange}
            required
          />
          <input
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            type='password'
            name='password'
            value={formData.password}
            placeholder='Password'
            onChange={handleFormChange}
            required
          />

          <button
            type='submit'
            className='mt-2 !bg-blue-600 text-white py-2 rounded-lg hover:!bg-blue-700 transition duration-300 font-semibold shadow-md'
          >
            Sign Up
          </button>
        </form>

        <p className='mt-4 text-sm text-center text-gray-600'>
          Already have an account?{" "}
          <span
            className='text-blue-600 hover:underline cursor-pointer'
            onClick={() => navigate("/")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
