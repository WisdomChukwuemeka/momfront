import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Form = ({ fields, onSubmit, submitLabel = 'Submit' }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={onSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-4 max-w-lg mx-auto"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              defaultValue={field.defaultValue || ''}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type || 'text'}
              defaultValue={field.defaultValue || ''}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="bi bi-check-lg"></i>
          {submitLabel}
        </button>
      </div>
    </motion.form>
  );
}
