import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';

interface WeightGoalProps {
  weightGoal: number;
  updateQuizData: (data: { weightGoal: number }) => void;
  onContinue: () => void;
}

const WeightGoal: React.FC<WeightGoalProps> = ({ 
  weightGoal, 
  updateQuizData, 
  onContinue 
}) => {
  const [value, setValue] = useState(weightGoal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleContinue = () => {
    updateQuizData({ weightGoal: value });
    onContinue();
  };

  const getMessage = (kg: number) => {
    switch (true) {
      case kg <= 3:
        return "Perfeito para definir o corpo e eliminar pequenos incômodos.";
      case kg <= 6:
        return "Com este peso a menos, suas roupas ficarão mais soltas e sua cintura mais definida.";
      case kg <= 10:
        return "Uma transformação significativa que trará mais energia e confiança no dia a dia.";
      default:
        return "Uma mudança completa que impactará sua saúde e qualidade de vida.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-xl text-[#2E7D32] mb-4 text-center">
          <strong>Seu objetivo de emagrecimento</strong>
        </h2>
        
        <p className="mb-6 text-center">
          Arraste o controle para definir <strong>quantos quilos você gostaria de perder</strong> nas próximas semanas
        </p>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center">
            <motion.span 
              className="text-5xl font-montserrat font-bold text-[#2E7D32]"
              key={value}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {value}
            </motion.span>
            <span className="text-2xl ml-1 text-[#2E7D32]">kg</span>
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
            max="15"
            value={value}
            onChange={handleChange}
            className="w-full h-2 bg-[#EAF5EB] rounded-lg appearance-none cursor-pointer my-6"
            style={{
              background: `linear-gradient(to right, #2E7D32 0%, #2E7D32 ${(value / 15) * 100}%, #EAF5EB ${(value / 15) * 100}%, #EAF5EB 100%)`
            }}
          />

          <div className="flex justify-between text-sm text-gray-500 px-1">
            <span>1kg</span>
            <span>15kg</span>
          </div>
        </div>

        <Card className="bg-[#EAF5EB]/75 mb-8">
          <p className="text-center text-[#2E7D32]">
            <strong>{getMessage(value)}</strong>
          </p>
        </Card>

        <Button onClick={handleContinue}>
          CONFIRMAR MEU OBJETIVO
        </Button>
      </Card>
    </motion.div>
  );
};

export default WeightGoal;