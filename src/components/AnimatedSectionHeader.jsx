import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSectionHeader = ({ title, description }) => {
  return (
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#1B4332] mb-4"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "6rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-1 bg-[#9CCC5A] mx-auto"
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedSectionHeader; 