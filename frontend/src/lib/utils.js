import { clsx } from 'clsx';

export const cn = (...inputs) => {
  return clsx(inputs);
};

export const getCategoryColor = (category) => {
  const colors = {
    "Billing": "from-green-500 to-emerald-600",
    "Technical Support": "from-blue-500 to-cyan-600",
    "Feature Request": "from-purple-500 to-indigo-600",
    "Bug Report": "from-red-500 to-pink-600",
    "Account Management": "from-orange-500 to-yellow-600",
  };
  return colors[category] || "from-gray-500 to-gray-600";
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

export const truncateText = (text, maxLength = 100) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};