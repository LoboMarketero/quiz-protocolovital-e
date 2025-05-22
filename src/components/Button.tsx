import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'cta';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  const baseClasses = "py-3 px-6 rounded-xl text-white font-montserrat font-bold text-center w-full transition-transform hover:scale-[1.03] active:scale-[0.98]";
  
  const variantClasses = {
    primary: "bg-[#2E7D32] shadow-md",
    cta: "bg-[#2E7D32] shadow-lg animate-pulse-slow"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;