import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../Card';
import { Check } from 'lucide-react';

interface CalculatingResultsProps {
  onContinue: () => void;
}

const steps = [
  "Calculando potencial de perda de peso...",
  "Determinando grau de bloqueio intestinal...",
  "Analisando nível parasitário...",
  "Estimando tempo de resposta ao protocolo...",
  "Verificando compatibilidade com método 4F...",
  "Consolidando resultados finais..."
];

const CalculatingResults: React.FC<CalculatingResultsProps> = ({ onContinue }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setCompletedSteps(prev => [...prev, currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onContinue, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-xl text-primary-800 mb-6 text-center">
          Calculando seu resultado final
        </h2>

        <div className="mb-8">
          <motion.div
            className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2E7D32"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ 
                  strokeDashoffset: 283 - (283 * (completedSteps.length / steps.length)) 
                }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-3xl font-montserrat font-bold text-primary-800">
                {Math.round((completedSteps.length / steps.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`
                flex items-center p-3 rounded-lg border 
                ${completedSteps.includes(index) 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-200 bg-white/50'}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full mr-3 flex items-center justify-center
                ${completedSteps.includes(index) 
                  ? 'bg-green-500' 
                  : 'bg-gray-200'}
              `}>
                {completedSteps.includes(index) && <Check size={16} color="white" />}
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-center opacity-75">
          Aguarde enquanto finalizamos seu diagnóstico personalizado...
        </p>
      </Card>
    </motion.div>
  );
};

export default CalculatingResults;