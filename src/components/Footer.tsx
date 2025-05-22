import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-4 mt-6 text-center text-sm text-gray-600">
      © Protocolo Intestinal Vital 4F – Todos os direitos reservados – {currentYear}
    </footer>
  );
};

export default Footer;