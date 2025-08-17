import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VideoAPI } from './services/data';
import axios from 'axios'; // so we can fetch using next/previous URLs

export const VideoList = () => {
  const [data, setData] = useState([])
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [error, setError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const fetchVideos = async (url = null) => {
    try {
      const res = url ? await axios.get(url) : await VideoAPI.list();
      setData(res.data.results);
      console.log(res.data)
      setNext(res.data.next);
      setPrevious(res.data.previous);
    } catch (error) {
      console.error(error);
      setError('Failed to load video.');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const confirmDelete = (id) => {
    setVideoToDelete(id);
    setShowConfirm(true);
  };

  // Delete video
  const handleDelete = async () => {
    try {
      await VideoAPI.delete(videoToDelete); // Ensure this is correct
      setData(prevData => prevData.filter(video => video.id !== videoToDelete));
      setShowConfirm(false);
      setVideoToDelete(null);
    } catch (error) {
      console.error("Error deleting video:", error);
      setError("Failed to delete video. Please try again.");
    }
  };

  return (
    <>

    {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/90 bg-opacity-0 
        flex justify-center items-center z-50 *:
        text-sm md:text-2xl lg:text-3xl
        ">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg 
            p-6 max-w-sm w-full"
          >
            <h2 className="text-lg font-bold
             text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
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
        <h1 className="text-2xl font-bold text-gray-800">Videos</h1>
        <Link to="/videos">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          <i className="bi bi-plus-lg"></i>
          Add Video
        </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((event, index) => (
              <motion.tr
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{event.title}</td>
                <td className="px-6 py-4 whitespace-nowrap w-40 h-40">
                <video controls>
                  <source src={event.video_url} type="video/mp4" />
                </video>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-800"><i className="bi bi-eye"></i></button>
                  <button className="text-yellow-600 hover:text-yellow-800"><i className="bi bi-pencil"></i></button>
                   <button onClick={() => confirmDelete(event.id)} className="text-red-600 hover:text-red-800">
                      <i className="bi bi-trash"></i>
                    </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Buttons */}
        <div className="flex justify-center gap-8 mt-4">
          <button
            onClick={() => fetchVideos(previous)}
            disabled={!previous}
            className={`px-4 py-2 rounded ${previous ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            onClick={() => fetchVideos(next)}
            disabled={!next}
            className={`px-4 py-2 rounded ${next ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
    </motion.div>
    </>
  );
}
