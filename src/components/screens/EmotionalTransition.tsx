import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EmotionalTransitionProps {
  onContinue: () => void;
}

const beforeAfterImages = [
  {
    id: 1,
    src: 'https://i.postimg.cc/DZDN8FJL/antes-e-depois-2-2.jpg',
    alt: 'Transformação antes e depois 1'
  },
  {
    id: 2,
    src: 'https://i.postimg.cc/QMfwZcj6/antes-e-depois-2-1.jpg',
    alt: 'Transformação antes e depois 2'
  }
];

const EmotionalTransition: React.FC<EmotionalTransitionProps> = ({ onContinue }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev === beforeAfterImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImage((prev) => (prev === 0 ? beforeAfterImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-xl text-[#2E7D32] mb-6 text-center">
          Você não está sozinha nessa luta!
        </h2>
        
        <div className="mb-6 relative">
          <div className="overflow-hidden relative h-[400px] rounded-lg">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentImage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full"
              >
                <img 
                  src={beforeAfterImages[currentImage].src}
                  alt={beforeAfterImages[currentImage].alt}
                  className="w-full h-full object-cover rounded-lg shadow-card"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
          >
            <ChevronLeft size={20} className="text-[#2E7D32]" />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
          >
            <ChevronRight size={20} className="text-[#2E7D32]" />
          </button>

          <div className="flex justify-center mt-4">
            {beforeAfterImages.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full mx-1 ${
                  i === currentImage ? 'bg-[#2E7D32]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="italic text-lg mb-4 text-center">
            "Você se esforça, faz dieta, treina... e <strong>mesmo assim nada muda?</strong>"
          </p>
          
          <p className="mb-4">
            Talvez o problema <strong>não esteja no que você faz</strong>, mas no que <strong>vive dentro de você</strong>.
          </p>
          
          <p>
            Pesquisas recentes revelam que <strong>89% das mulheres</strong> com dificuldade para emagrecer possuem uma <strong>infestação parasitária intestinal não diagnosticada</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button onClick={onContinue}>
            DESCOBRIR SE ISSO AFETA VOCÊ
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default EmotionalTransition;