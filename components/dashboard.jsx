import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { ContentAPI } from './services/data';

export const Dashboard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await ContentAPI.list();
      const apiData = res.data;

      // Transform API object into an array of dashboard items
      const formatted = [
        { title: 'Events', value: apiData.events_count, icon: 'bi-calendar-event' },
        { title: 'Videos', value: apiData.videos_count, icon: 'bi-camera-video' },
        { title: 'Music', value: apiData.musics_count, icon: 'bi-music-note' },
        { title: 'Books', value: apiData.books_count, icon: 'bi-book' },
        { title: 'Testimonials', value: apiData.testimonials_count, icon: 'bi-chat-quote' },
        { title: 'About', value: apiData.abouts_count, icon: 'bi-info-circle' },
        { title: 'Contacts', value: apiData.contacts_count, icon: 'bi-envelope' },
      ];

      setCards(formatted);
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <span className="text-sm text-gray-500">Welcome back, Admin</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h2 className="text-sm font-medium text-gray-500">{card.title}</h2>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
            <i className={`bi ${card.icon} text-3xl text-gray-400`} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
