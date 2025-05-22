import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import { AlertTriangle, Check, Cookie, Brain, Gauge, Heart, Frown, Thermometer, Activity, Wind } from 'lucide-react';

interface ParasiteTestProps {
  parasiteSymptoms: string[];
  updateQuizData: (data: { parasiteSymptoms: string[], infestationLevel: number }) => void;
  onContinue: () => void;
}

const symptomsList = [
  { id: 'hunger', text: 'Fome excessiva mesmo após comer', icon: Cookie },
  { id: 'sleep', text: 'Dificuldade para dormir ou acordar cansada', icon: Brain },
  { id: 'bloating', text: 'Inchaço abdominal que piora ao longo do dia', icon: Gauge },
  { id: 'cravings', text: 'Desejos incontroláveis por doces', icon: Heart },
  { id: 'mood', text: 'Irritabilidade ou ansiedade sem motivo aparente', icon: Frown },
  { id: 'skin', text: 'Acne ou erupções cutâneas inexplicáveis', icon: Thermometer },
  { id: 'digestion', text: 'Gases ou desconforto intestinal frequente', icon: Activity },
  { id: 'fatigue', text: 'Fadiga constante mesmo dormindo bem', icon: Wind },
  { id: 'weight', text: 'Peso que não diminui mesmo seguindo dieta', icon: Activity },
  { id: 'breath', text: 'Mau hálito persistente mesmo com boa higiene', icon: Wind },
];

const ParasiteTest: React.FC<ParasiteTestProps> = ({ 
  parasiteSymptoms, 
  updateQuizData, 
  onContinue 
}) => {
  const [selected, setSelected] = useState<string[]>(parasiteSymptoms);
  const [showWarning, setShowWarning] = useState(false);
  
  const handleToggle = (id: string) => {
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
    const level = Math.max(45, Math.min(100, Math.round((selected.length / symptomsList.length) * 100)));
    updateQuizData({ 
      parasiteSymptoms: selected,
      infestationLevel: level
    });
    onContinue();
  };

  const highRisk = selected.length >= 3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <h2 className="font-montserrat font-bold text-xl text-[#2E7D32] mb-4">
          Teste de Infestação Parasitária
        </h2>
        
        <p className="mb-6">
          Selecione todos os sintomas que você tem experimentado:
        </p>

        <div className="space-y-3 mb-6">
          {symptomsList.map(symptom => {
            const Icon = symptom.icon;
            return (
              <div 
                key={symptom.id}
                onClick={() => handleToggle(symptom.id)}
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
                <Icon className="w-5 h-5 mr-3 text-[#2E7D32]" />
                <span>{symptom.text}</span>
              </div>
            );
          })}
        </div>

        {highRisk && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start">
            <AlertTriangle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm text-red-600">
              <strong>ALERTA:</strong> Você apresenta sinais significativos de uma possível infestação parasitária.
            </p>
          </div>
        )}

        {showWarning && (
          <div className="mb-6 p-3 bg-[#EAF5EB] border border-[#2E7D32] rounded-lg flex items-start">
            <AlertTriangle className="text-[#2E7D32] mr-2 mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm text-[#2E7D32]">
              Por favor, selecione pelo menos um sintoma para continuarmos.
            </p>
          </div>
        )}

        <Button onClick={handleContinue}>
          REVELAR MEU RISCO PARASITÁRIO
        </Button>
      </Card>
    </motion.div>
  );
};

export default ParasiteTest;