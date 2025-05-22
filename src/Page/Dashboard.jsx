import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [ships, setShips] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchShips = async (name) => {
    try {
      setLoading(true);
      setError("");

      const query = name.trim() === "" ? "all" : name.trim();

      const token = localStorage.getItem("token");
      console.log("token", token);

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

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-4xl'>
        <h1 className='text-4xl font-bold text-center mb-10 text-blue-800'>Marine Operations</h1>

        {/* Centered Search Form */}
        <form
          onSubmit={handleSearch}
          className='flex flex-col sm:flex-row justify-center items-center gap-4 mb-12'
        >
          <input
            type='text'
            placeholder='Search by ship or location name'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <button
            type='submit'
            className='bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-2 rounded-full shadow-md hover:shadow-lg '
          >
            Search
          </button>
        </form>

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
              className='bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300'
            >
              <img src={ship.imageUrl} alt={ship.name} className='w-full h-48 object-cover' />
              <div className='p-5 space-y-2'>
                <h2 className='text-2xl font-bold text-blue-700'>{ship.name}</h2>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Type:</span> {ship.type}
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Location:</span> {ship.location}
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Depth:</span> {ship.depth}
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Temperature:</span> {ship.temperature}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
