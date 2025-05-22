import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  onClick,
  isSelected = false,
  className = '',
}) => {
  const baseClasses = "p-4 rounded-xl backdrop-blur-xl backdrop-filter bg-white/75 border border-white/50 shadow-card mb-4";
  const selectedClasses = isSelected ? "border-primary-500 border-2" : "";
  
  return (
    <motion.div
      className={`${baseClasses} ${selectedClasses} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;