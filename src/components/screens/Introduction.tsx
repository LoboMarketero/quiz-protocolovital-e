import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';

interface IntroductionProps {
  onContinue: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-2xl text-[#2E7D32] mb-4 leading-tight">
          Descubra quanto peso você pode perder <strong>eliminando parasitas intestinais</strong>
        </h2>
        
        <p className="mb-6">
          Teste oficial da <strong>Dra. Emanuelle Caceres</strong>, biomédica especialista em saúde intestinal feminina
        </p>

        <div className="mb-6">
          <img
            src="https://i.postimg.cc/wjJGMSgs/13-D32196-5-C3-D-4863-94-B3-9565-E8-C00913.jpg"
            alt="Transformação"
            className="w-full rounded-lg shadow-card"
          />
        </div>

        <p className="text-sm text-center mb-6">
          <strong>Mais de 2.400 mulheres já fizeram este teste!</strong>
        </p>

        <Button onClick={onContinue}>
          COMEÇAR MEU TESTE GRATUITO
        </Button>
      </Card>
    </motion.div>
  );
};

export default Introduction;