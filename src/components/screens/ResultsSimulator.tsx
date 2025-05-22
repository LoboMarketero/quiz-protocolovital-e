import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';

interface ResultsSimulatorProps {
  weightGoal: number;
  onContinue: () => void;
}

const ResultsSimulator: React.FC<ResultsSimulatorProps> = ({ 
  weightGoal, 
  onContinue 
}) => {
  const [days, setDays] = useState(7);
  const [weightLoss, setWeightLoss] = useState(0);
  const [waistReduction, setWaistReduction] = useState(0);
  
  useEffect(() => {
    const maxDays = 21;
    const ratio = days / maxDays;
    
    setWeightLoss(Math.round(weightGoal * ratio * 10) / 10);
    setWaistReduction(Math.round(((weightGoal / 3) * ratio) * 10) / 10);
  }, [days, weightGoal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays(Number(e.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-xl text-primary-800 mb-4 text-center">
          Simulador de Resultados
        </h2>
        
        <p className="mb-6 text-center">
          Mova o controle para visualizar os resultados possíveis em diferentes períodos:
        </p>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center">
            <motion.span 
              className="text-5xl font-montserrat font-bold text-primary-800"
              key={days}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {days}
            </motion.span>
            <span className="text-2xl ml-1 text-primary-800">dias</span>
          </div>
          
          <style>
            {`
              input[type="range"] {
                -webkit-appearance: none;
                height: 8px;
                border-radius: 8px;
                outline: none;
              }

              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #2E7D32;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                cursor: pointer;
                transition: all 0.2s ease;
              }

              input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 3px 8px rgba(0,0,0,0.3);
              }

              input[type="range"]::-moz-range-thumb {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #2E7D32;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                cursor: pointer;
                transition: all 0.2s ease;
              }

              input[type="range"]::-moz-range-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 3px 8px rgba(0,0,0,0.3);
              }
            `}
          </style>
          
          <input
            type="range"
            min="1"
            max="21"
            value={days}
            onChange={handleChange}
            className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer my-6"
            style={{
              background: `linear-gradient(to right, #2E7D32 0%, #2E7D32 ${(days / 21) * 100}%, #eaf5eb ${(days / 21) * 100}%, #eaf5eb 100%)`
            }}
          />

          <div className="flex justify-between text-sm text-gray-500 px-1">
            <span>1 dia</span>
            <span>21 dias</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm mb-8">
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-800 mr-2"></div>
              <span>Perda de peso: <strong>{weightLoss}kg</strong></span>
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-600 mr-2"></div>
              <span>Redução de cintura: <strong>{waistReduction}cm</strong></span>
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-400 mr-2"></div>
              <span>Desbloqueio metabólico: <strong>{Math.min(100, Math.round(days * 4.5))}%</strong></span>
            </li>
          </ul>
        </div>

        <div className="bg-primary-50 p-4 rounded-lg mb-6">
          <p className="text-center">
            Com base no seu perfil, você pode perder até <strong>{weightGoal}kg</strong>, reduzir <strong>{Math.round(weightGoal / 3)}cm</strong> de cintura e desbloquear seu metabolismo em <strong>21 dias</strong>.
          </p>
        </div>

        <Button onClick={onContinue} variant="cta">
          SIM, QUERO ESTA TRANSFORMAÇÃO
        </Button>
      </Card>
    </motion.div>
  );
};

export default ResultsSimulator;