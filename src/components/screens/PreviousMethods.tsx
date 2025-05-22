import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import { AlertCircle } from 'lucide-react';

interface PreviousMethodsProps {
  triedMethods: string[];
  updateQuizData: (data: { triedMethods: string[] }) => void;
  onContinue: () => void;
}

const methodsList = [
  { id: 'lowcarb', text: 'Dieta Low Carb' },
  { id: 'keto', text: 'Dieta Cetogênica' },
  { id: 'intermittent', text: 'Jejum Intermitente' },
  { id: 'gym', text: ['Academia/', 'Musculação'] },
  { id: 'running', text: 'Corrida/Cardio' },
  { id: 'detox', text: 'Dietas Detox' },
  { id: 'shakes', text: 'Shakes de Proteína' },
  { id: 'pills', text: ['Remédios/', 'Suplementos'] },
];

const PreviousMethods: React.FC<PreviousMethodsProps> = ({ 
  triedMethods, 
  updateQuizData, 
  onContinue 
}) => {
  const [selected, setSelected] = useState<string[]>(triedMethods);
  const [showWarning, setShowWarning] = useState(false);

  const toggleMethod = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
    setShowWarning(false);
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      setShowWarning(true);
      return;
    }
    updateQuizData({ triedMethods: selected });
    onContinue();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-xl text-primary-800 mb-4">
          Métodos que você já tentou
        </h2>
        
        <p className="mb-6">
          Selecione todas as estratégias que você já tentou para emagrecer:
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {methodsList.map(method => (
            <div 
              key={method.id}
              className={`
                p-3 rounded-lg border cursor-pointer transition-all text-center flex items-center justify-center min-h-[80px] text-sm
                ${selected.includes(method.id) 
                  ? 'border-primary-500 bg-primary-50/75' 
                  : 'border-gray-200 bg-white/50'}
              `}
              onClick={() => toggleMethod(method.id)}
            >
              {Array.isArray(method.text) ? (
                <div className="flex flex-col">
                  {method.text.map((line, index) => (
                    <span key={index}>{line}</span>
                  ))}
                </div>
              ) : (
                method.text
              )}
            </div>
          ))}
        </div>

        {selected.length > 0 && (
          <div className="mb-6 p-3 bg-primary-50 border border-primary-100 rounded-lg flex items-start">
            <AlertCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm">
              <span className="font-semibold">Importante:</span> Esses métodos podem ter falhado porque parasitas estão bloqueando seu metabolismo.
            </p>
          </div>
        )}

        {showWarning && (
          <div className="mb-6 p-3 bg-primary-50 border border-primary-100 rounded-lg flex items-start">
            <AlertCircle className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm">
              Por favor, selecione pelo menos um método que você já tentou.
            </p>
          </div>
        )}

        <Button onClick={handleContinue}>
          ENTENDER POR QUE NÃO FUNCIONOU
        </Button>
      </Card>
    </motion.div>
  );
};

export default PreviousMethods;