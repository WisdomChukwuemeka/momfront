import { motion } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { VideoAPI } from "./services/data";
import { useNavigate, Link } from "react-router-dom";

export const VideoForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: null,
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // For text inputs (title, description)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For video file input
  const handleVideoFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        video_url: e.target.files[0],
      }));
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("video_url", formData.video_url);

    try {
      const res = await VideoAPI.create(data);
      alert("Video uploaded successfully");
      console.log(res.data);
      navigate("/videos-items");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(
        err.response?.data?.video_url?.[0] ||
          err.response?.data?.title?.[0] ||
          err.response?.data?.detail ||
          "Failed to upload video. Please check your file and try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader border-t-4 border-blue-500 w-10 h-10 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800">Upload Video</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Video Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows="4"
            name="description"
            placeholder="Video Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-purple-500 focus:ring focus:ring-purple-200"
          ></textarea>
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video File
          </label>
          <input
            type="file"
            name="video_url"
            id="video-upload"
            accept=".mp4,.mov,.avi,.mkv"
            onChange={handleVideoFileChange}
            required
            className="hidden"
          />
          <label
            htmlFor="video-upload"
            className="inline-flex items-center justify-center w-24 h-24 bg-purple-500 text-white rounded-full cursor-pointer hover:bg-purple-600 transition overflow-hidden"
          >
            {preview ? (
              <video
                src={preview}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
              />
            ) : (
              <i className="bi bi-camera-reels-fill text-3xl"></i>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center">
            <Link to="/videos-items">
            <div className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Uploaded Video
            </div>
            </Link>


        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            Upload Video
          </button>
        </div>

        
        </div>
      </form>
    </motion.div>
  );
};
