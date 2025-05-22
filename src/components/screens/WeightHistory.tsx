import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import { AlertCircle } from 'lucide-react';

interface WeightHistoryProps {
  weightHistory: {
    startedGaining: string;
    problemArea: string;
    recentGain: string;
  };
  updateQuizData: (data: { weightHistory: typeof weightHistory }) => void;
  onContinue: () => void;
}

const WeightHistory: React.FC<WeightHistoryProps> = ({ 
  weightHistory, 
  updateQuizData, 
  onContinue 
}) => {
  const [formData, setFormData] = useState(weightHistory);
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (category: keyof typeof weightHistory, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: value
    }));
    setShowWarning(false);
  };

  const handleContinue = () => {
    if (!formData.startedGaining && !formData.problemArea && !formData.recentGain) {
      setShowWarning(true);
      return;
    }
    updateQuizData({ weightHistory: formData });
    onContinue();
  };

  const startedOptions = [
    { id: 'teens', text: 'Na adolescência' },
    { id: 'pregnancy', text: 'Após engravidar' },
    { id: 'thirties', text: 'Depois dos 30 anos' },
    { id: 'forties', text: 'Depois dos 40 anos' },
    { id: 'recent', text: 'Nos últimos 2 anos' },
  ];

  const problemAreaOptions = [
    { id: 'belly', text: 'Barriga' },
    { id: 'thighs', text: 'Coxas' },
    { id: 'arms', text: 'Braços' },
    { id: 'all', text: 'Todo o corpo' },
  ];

  const recentGainOptions = [
    { id: '0-3', text: 'Menos de 3kg' },
    { id: '3-5', text: 'Entre 3kg e 5kg' },
    { id: '5-10', text: 'Entre 5kg e 10kg' },
    { id: '10+', text: 'Mais de 10kg' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-xl text-primary-800 mb-4">
          Seu histórico de peso
        </h2>
        
        <p className="mb-6">
          Estas informações são importantes para identificarmos o padrão de ação dos parasitas no seu corpo:
        </p>

        <div className="mb-6">
          <p className="font-semibold mb-2">Quando você começou a ganhar peso?</p>
          <div className="space-y-2">
            {startedOptions.map(option => (
              <div
                key={option.id}
                className={`
                  p-3 rounded-lg border cursor-pointer
                  ${formData.startedGaining === option.id
                    ? 'border-primary-500 bg-primary-50/75'
                    : 'border-gray-200 bg-white/50'}
                `}
                onClick={() => handleChange('startedGaining', option.id)}
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Onde você acumula mais gordura?</p>
          <div className="space-y-2">
            {problemAreaOptions.map(option => (
              <div
                key={option.id}
                className={`
                  p-3 rounded-lg border cursor-pointer
                  ${formData.problemArea === option.id
                    ? 'border-primary-500 bg-primary-50/75'
                    : 'border-gray-200 bg-white/50'}
                `}
                onClick={() => handleChange('problemArea', option.id)}
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-2">Quantos quilos você ganhou nos últimos 12 meses?</p>
          <div className="space-y-2">
            {recentGainOptions.map(option => (
              <div
                key={option.id}
                className={`
                  p-3 rounded-lg border cursor-pointer
                  ${formData.recentGain === option.id
                    ? 'border-primary-500 bg-primary-50/75'
                    : 'border-gray-200 bg-white/50'}
                `}
                onClick={() => handleChange('recentGain', option.id)}
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>

        {showWarning && (
          <div className="mb-6 p-3 bg-primary-50 border border-primary-100 rounded-lg flex items-start">
            <AlertCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm">
              Por favor, responda pelo menos uma pergunta para continuarmos.
            </p>
          </div>
        )}

        <Button onClick={handleContinue}>
          CONTINUAR
        </Button>
      </Card>
    </motion.div>
  );
};

export default WeightHistory;