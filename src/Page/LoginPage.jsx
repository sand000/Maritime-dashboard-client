import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const [formData, setFormData] = useState({
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
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      if (response.data?.data.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.data.token);

        alert(`Welcome back ${response.data.data.user.name}!`);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("No user found or login failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold text-center text-blue-700 mb-6'>Login</h2>

        <form onSubmit={handleFormSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            name='email'
            value={formData.email}
            placeholder='Enter Email'
            onChange={handleFormChange}
            required
            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            placeholder='Enter Password'
            onChange={handleFormChange}
            required
            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <button
            type='submit'
            className='mt-2 !bg-blue-600 text-white py-2 rounded-lg hover:!bg-blue-700 transition duration-300 font-semibold shadow-md'
          >
            Login
          </button>
        </form>

        <p className='text-center text-sm text-gray-600 mt-4'>
          Don't have an account?{" "}
          <a href='/signup' className='text-blue-600 hover:underline font-medium'>
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
