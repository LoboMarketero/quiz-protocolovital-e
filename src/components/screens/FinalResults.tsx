import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import { AlertTriangle } from 'lucide-react';

interface FinalResultsProps {
  quizData: {
    weightGoal: number;
    symptoms: string[];
    parasiteSymptoms: string[];
    blockageLevel?: number;
    infestationLevel?: number;
    compatibilityLevel?: number;
  };
}

const FinalResults: React.FC<FinalResultsProps> = ({ quizData }) => {
  const blockageLevel = Math.max(30, quizData.blockageLevel || 
    Math.min(100, Math.round((quizData.symptoms.length / 8) * 100)));
  
  const infestationLevel = Math.max(45, quizData.infestationLevel || 
    Math.min(100, Math.round((quizData.parasiteSymptoms.length / 10) * 100)));
  
  const compatibilityLevel = quizData.compatibilityLevel || 
    Math.min(100, Math.max(75, 90 + Math.floor(Math.random() * 10)));

  const getColorByType = (type: string) => {
    switch(type) {
      case 'blockage':
        return '#f59e0b'; // Always yellow
      case 'infestation':
        return '#ef4444'; // Always red
      case 'compatibility':
        return '#4CAF50'; // Always green
      default:
        return '#4CAF50';
    }
  };

  const CircularProgressBar = ({ percentage, label, type = 'normal' }: { percentage: number, label: string, type?: string }) => {
    const color = getColorByType(type);
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * percentage / 100) }}
              transition={{ duration: 1 }}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-xl font-montserrat font-bold" style={{ color }}>{percentage}%</span>
          </div>
        </div>
        <p className="text-sm mt-2 text-center">{label}</p>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Card className="p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6 flex items-start"
        >
          <AlertTriangle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-montserrat font-bold text-red-700 mb-1">
              ATENÇÃO: seu resultado revela um bloqueio metabólico severo causado por parasitas
            </h3>
            <p className="text-sm text-red-600">
              Identificamos alta probabilidade de infestação parasitária que está sabotando seus esforços para emagrecer.
            </p>
          </div>
        </motion.div>

        <h2 className="font-montserrat font-bold text-xl text-primary-800 mb-4 text-center">
          Seu Diagnóstico Completo
        </h2>

        <div className="flex justify-between items-center mb-8">
          <CircularProgressBar 
            percentage={blockageLevel} 
            label="Bloqueio Metabólico"
            type="blockage"
          />
          <CircularProgressBar 
            percentage={infestationLevel} 
            label="Nível de Infestação"
            type="infestation"
          />
          <CircularProgressBar 
            percentage={compatibilityLevel} 
            label="Compatibilidade 4F"
            type="compatibility"
          />
        </div>

        <div className="mb-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            O que você sente não é falta de força de vontade. É uma <span className="font-semibold">infestação invisível</span> sabotando seu corpo dia após dia.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-4"
          >
            Com base na sua análise, você pode perder até <span className="font-semibold">{quizData.weightGoal}kg em 21 dias</span> seguindo o Protocolo Intestinal Vital 4F, que foi especialmente desenvolvido para:
          </motion.p>
          
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="list-disc pl-5 mb-4 space-y-2"
          >
            <li>Eliminar parasitas intestinais de forma natural e segura</li>
            <li>Desbloquear seu metabolismo e restaurar seu equilíbrio hormonal</li>
            <li>Reduzir a inflamação e inchaço, especialmente na região abdominal</li>
            <li>Promover a queima de gordura de forma acelerada e sustentável</li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <a 
            href="https://teste-e.protocolovital4f.online/"
            className="block"
          >
            <Button variant="cta">
              QUERO COMEÇAR AGORA
            </Button>
          </a>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default FinalResults;