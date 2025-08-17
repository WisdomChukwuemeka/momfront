import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const DataTable = ({ columns, data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow rounded-lg overflow-hidden"
    >
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.05 }}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-4 py-2 text-sm text-gray-700"
                  >
                    {row[col.accessor]}
                  </td>
                ))}
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-500">
                <i className="bi bi-inbox"></i> No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
}
