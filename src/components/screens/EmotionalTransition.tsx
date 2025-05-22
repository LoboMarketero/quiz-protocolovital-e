import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';

interface EmotionalTransitionProps {
  onContinue: () => void;
}

const EmotionalTransition: React.FC<EmotionalTransitionProps> = ({ onContinue }) => {
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
        
        <div className="mb-6 relative w-full pt-[177.78%]">
          <iframe 
            id="panda-20884f4d-9630-4a39-81bb-83eb0e88b247" 
            src="https://player-vz-ff1d2603-87c.tv.pandavideo.com.br/embed/?v=20884f4d-9630-4a39-81bb-83eb0e88b247" 
            style={{ border: 'none' }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
            allowFullScreen={true}
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-card"
            fetchPriority="high"
          />
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