import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { TestimonialAPI } from './services/data';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const TestimonyForm = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [addEvent, setAddEvent] = useState(0)
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image_url: null,
    content: "",
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
      const res = await TestimonialAPI.create(data);
      alert("Video created successfully");
      console.log(res.results);
      setAddEvent((prev) => prev + 1)
      navigate('/testimony-items')
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
      <h1 className="text-2xl font-bold text-gray-800">Add Testimony</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text"
          name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
        required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" />
        </div>

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>

  {/* Hidden file input */}
  <input
    type="file"
    name="image_url"
    id="image_url"
    accept=".jpg,.jpeg,.png"
    onChange={handleChange}
    required
    className="hidden"
  />

  {/* Icon / Preview as trigger */}
  <label
    htmlFor="image_url"
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
          <label className="block text-sm font-medium text-gray-700">Testimony</label>
          <textarea rows="4" 
          name="content"
        placeholder="Message"
        value={formData.content}
        onChange={handleChange}
        required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"></textarea>
        </div>
        
        <div className="flex justify-between items-center">
            <Link to="/testimony-items">
            <div className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Uploaded Testimony
            </div>
            </Link>


        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            Create
          </button>
        </div>

        
        </div>
      </form>
    </motion.div>
  );
}
