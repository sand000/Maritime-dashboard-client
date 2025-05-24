import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const [ships, setShips] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user-details");
  const userDetails = storedUser ? JSON.parse(storedUser) : null;
  console.log("user details", userDetails);

  const fetchShips = async (name) => {
    try {
      setLoading(true);
      setError("");
      const query = name.trim() === "" ? "all" : name.trim();
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/ship/ships/${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShips(res.data);
    } catch (err) {
      setShips([]);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShips("");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchShips(searchText);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-details");
    navigate("/");
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navbar */}
      <nav className='w-full bg-white shadow-md py-4 px-4'>
        <div className='max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4'>
          {/* Left: Title */}
          <div className='w-full lg:w-auto flex justify-between items-center'>
            <h2 className='text-xl font-bold text-blue-500'>Marine Dashboard</h2>

            {/* Right (only visible on small screens) */}
            <div className='flex items-center gap-2 lg:hidden'>
              <FaUserCircle className='h-6 w-6 text-blue-500' />
              <span className='text-sm font-medium text-gray-700'>
                {userDetails?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className='bg-gray-100 text-black px-4 py-1 rounded-full text-sm shadow hover:shadow-md'
              >
                Logout
              </button>
            </div>
          </div>

          {/* Middle: Search */}
          <form
            onSubmit={handleSearch}
            className='w-full lg:flex-1 flex justify-center items-center gap-2'
          >
            <input
              type='text'
              placeholder='Search by ship or location name'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className='w-full sm:w-80 px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300'
            />
            <button
              type='submit'
              className='bg-gradient-to-r from-blue-300 to-blue-400 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg whitespace-nowrap'
            >
              Search
            </button>
          </form>

          {/* Right: User Info + Logout (hidden on small, visible on large screens) */}
          <div className='hidden lg:flex items-center gap-2'>
            <FaUserCircle className='h-6 w-6 text-blue-500' />
            <span className='text-sm font-medium text-gray-700'>{userDetails?.name || "User"}</span>
            <button
              onClick={handleLogout}
              className='bg-gray-100 text-black px-4 py-1 rounded-full text-sm shadow hover:shadow-md'
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='flex items-center justify-center px-4'>
        <div className='w-full max-w-6xl mt-10'>
          {loading && (
            <p className='text-center text-gray-600 text-lg font-medium'>Loading data...</p>
          )}
          {error && <p className='text-center text-red-500 text-lg font-semibold'>{error}</p>}
          {!loading && !error && ships.length === 0 && (
            <p className='text-center text-gray-500'>No ships found.</p>
          )}

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {ships.map((ship) => (
              <div
                key={ship.id}
                className='bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300'
              >
                <img src={ship.imageUrl} alt={ship.name} className='w-full h-48 object-cover' />
                <div className='p-5 space-y-2'>
                  <h2 className='text-2xl font-bold text-blue-500'>{ship.name}</h2>
                  <p className='text-gray-700'>
                    <span className='font-semibold'>Type:</span> {ship.type}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-semibold'>Location:</span> {ship.origin}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-semibold'>Depth:</span> {ship.tonnage}
                  </p>
                  <p className='text-gray-700'>
                    <span className='font-semibold'>Range:</span> {ship.range}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
