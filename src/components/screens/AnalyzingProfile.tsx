import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Card';

interface AnalyzingProfileProps {
  onContinue: () => void;
}

const analysisSteps = [
  "Iniciando diagnóstico preliminar...",
  "Analisando sua digestão...",
  "Verificando padrões de absorção de nutrientes...",
  "Identificando possíveis sinais de bloqueio metabólico...",
  "Detectando sinais de parasitas intestinais...",
  "Finalizando análise inicial..."
];

const AnalyzingProfile: React.FC<AnalyzingProfileProps> = ({ onContinue }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < analysisSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(onContinue, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStep, onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-xl text-primary-800 mb-6 text-center">
          Analisando seu perfil de saúde intestinal
        </h2>

        <div className="mb-8">
          <motion.div
            className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / (analysisSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>

        <div className="flex justify-center mb-8">
          <motion.div
            className="w-24 h-24 border-4 border-primary-300 border-t-primary-800 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.p
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-lg mb-6"
        >
          {analysisSteps[currentStep]}
        </motion.p>

        <p className="text-sm text-center opacity-75">
          Por favor, aguarde enquanto analisamos seus dados...
        </p>
      </Card>
    </motion.div>
  );
};

export default AnalyzingProfile;