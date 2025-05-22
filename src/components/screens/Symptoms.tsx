import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import { AlertCircle, Check } from 'lucide-react';

interface SymptomsProps {
  symptoms: string[];
  updateQuizData: (data: { symptoms: string[] }) => void;
  onContinue: () => void;
}

const symptomsList = [
  { id: 'bloating', text: 'Inchaço abdominal frequente' },
  { id: 'fatigue', text: 'Cansaço mesmo após dormir bem' },
  { id: 'cravings', text: 'Desejos intensos por doces' },
  { id: 'weight', text: 'Dificuldade para perder peso' },
  { id: 'mood', text: 'Alterações de humor frequentes' },
  { id: 'skin', text: 'Problemas de pele inexplicáveis' },
  { id: 'digestion', text: 'Desconforto digestivo após refeições' },
  { id: 'immunity', text: 'Sistema imunológico enfraquecido' },
];

const Symptoms: React.FC<SymptomsProps> = ({ 
  symptoms, 
  updateQuizData, 
  onContinue 
}) => {
  const [selected, setSelected] = useState<string[]>(symptoms);
  const [showWarning, setShowWarning] = useState(false);

  const toggleSymptom = (id: string) => {
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
    updateQuizData({ symptoms: selected });
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
        <h2 className="font-montserrat font-bold text-xl text-[#2E7D32] mb-4">
          Identifique seus sintomas de bloqueio
        </h2>
        
        <p className="mb-6">
          Selecione todos os sintomas que você tem experimentado nos últimos meses:
        </p>

        <div className="space-y-3 mb-6">
          {symptomsList.map(symptom => (
            <div 
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              className={`
                flex items-center p-3 rounded-lg border cursor-pointer transition-all
                ${selected.includes(symptom.id) 
                  ? 'border-[#2E7D32] bg-[#EAF5EB]' 
                  : 'border-gray-200 bg-white/50'}
              `}
            >
              <div className={`
                w-5 h-5 rounded border mr-3 flex items-center justify-center
                ${selected.includes(symptom.id) 
                  ? 'border-[#2E7D32] bg-[#2E7D32]' 
                  : 'border-gray-300'}
              `}>
                {selected.includes(symptom.id) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <span>{symptom.text}</span>
            </div>
          ))}
        </div>

        {selected.length >= 4 && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start">
            <AlertCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm text-red-600">
              Seu nível de bloqueio está alto. Isso sugere uma possível infestação parasitária afetando seu metabolismo.
            </p>
          </div>
        )}

        {showWarning && (
          <div className="mb-6 p-3 bg-[#EAF5EB] border border-[#2E7D32] rounded-lg flex items-start">
            <AlertCircle className="text-[#2E7D32] mr-2 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm">
              Por favor, selecione pelo menos um sintoma para continuarmos.
            </p>
          </div>
        )}

        <Button onClick={handleContinue}>
          ANALISAR MEU BLOQUEIO
        </Button>
      </Card>
    </motion.div>
  );
};

export default Symptoms;