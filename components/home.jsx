import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 md:px-20 py-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Empower Your <span className="text-blue-600">Management</span> with Smart Tools
          </h2>
          <p className="text-lg text-gray-600">
            A modern dashboard solution designed to help admins manage data, users, and reports seamlessly.
          </p>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
            Get Started <i className="bi bi-arrow-right"></i>
          </button>
        </motion.div>

        {/* Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin Dashboard Illustration"
            className="w-80 md:w-[400px] drop-shadow-xl"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-10 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "User Management", desc: "Easily add, edit, and control user access." },
          { title: "Data Insights", desc: "Visualize reports and track KPIs in real time." },
          { title: "Secure Access", desc: "Enterprise-grade security for safe operations." },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
