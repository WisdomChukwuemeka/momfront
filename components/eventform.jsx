import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { EventAPI } from './services/data';
import { useNavigate } from 'react-router-dom';

export const EventForm = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [addEvent, setAddEvent] = useState(0)
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    date: "",
    location: "",
  });
  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (files && files[0]) {
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
    setPreview(URL.createObjectURL(files[0]));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await EventAPI.create(data);
      alert("Event created successfully");
      console.log(res.results);
      setAddEvent((prev) => prev + 1)
      navigate('/events')
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">Add Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text"
          name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" />
        </div>

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>

  {/* Hidden file input */}
  <input
    type="file"
    name="image"
    id="image-upload"
    accept=".jpg,.jpeg,.png"
    onChange={handleChange}
    required
    className="hidden"
  />

  {/* Icon / Preview as trigger */}
  <label
    htmlFor="image-upload"
    className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition overflow-hidden"
  >
    {preview ? (
      <img
        src={preview}
        alt="Preview"
        className="w-full h-full object-cover"
      />
    ) : (
      <i className="bi bi-person-fill text-3xl"></i>
    )}
  </label>
</div>



        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date"
          name="date"
        value={formData.date}
        onChange={handleChange}
        required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea rows="4" 
          name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Event
      </button>

        </div>
      </form>
    </motion.div>
  );
}
