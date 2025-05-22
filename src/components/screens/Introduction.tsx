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
          Teste oficial da <strong>Dra. Mariana Ribeiro</strong>, biomédica especialista em saúde intestinal feminina
        </p>

        <div className="mb-6">
          <img
            src="https://i.postimg.cc/4ynmfgVy/u7676189272-httpss-mj-run-F2-Q1o-OP5-YMA-Crea-una-imagen-de-una-d-72e611f9-dfb0-4949-ab4b-688ec225a381-0.png"
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