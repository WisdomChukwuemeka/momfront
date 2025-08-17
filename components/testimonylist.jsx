import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TestimonialAPI } from './services/data';
import axios from 'axios';

export const TestimonyList = () => {
  const [data, setData] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchTestimonials = async (url = null) => {
    try {
      const res = url ? await axios.get(url) : await TestimonialAPI.list();

      // Handle paginated or non-paginated response
      const results = Array.isArray(res.data) ? res.data : res.data.results || [];
      setData(res.data.results);
      setNext(res.data.next || null);
      setPrevious(res.data.previous || null);
      console.log(res)
    } catch (error) {
      console.error(error);
      setError('Failed to load testimonies.');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await TestimonialAPI.delete(itemToDelete);
      setData((prev) => prev.filter((t) => t.id !== itemToDelete));
      setShowConfirm(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Error deleting testimony:', error);
      setError('Failed to delete testimony. Please try again.');
    }
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this testimony? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Testimonies</h1>
          <Link to="/testimonyform">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              <i className="bi bi-plus-lg"></i>
              Add Testimony
            </button>
          </Link>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((testimony, index) => (
                <motion.tr
                  key={testimony.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{testimony.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{testimony.content}</td>
                  <td className="px-6 py-4">
                    {testimony.image_url && (
                      <img
                        src={testimony.image_url}
                        alt={testimony.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => confirmDelete(testimony.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-8 mt-4">
          <button
            onClick={() => fetchTestimonials(previous)}
            disabled={!previous}
            className={`px-4 py-2 rounded ${
              previous
                ? 'bg-gray-200 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            onClick={() => fetchTestimonials(next)}
            disabled={!next}
            className={`px-4 py-2 rounded ${
              next ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </motion.div>
    </>
  );
};
