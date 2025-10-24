import React from "react";
import { motion } from "framer-motion";

const Card = ({ children }) => {
  return (
    <motion.div
      className="card p-4 rounded-lg shadow-lg bg-white w-64 h-40 flex items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;