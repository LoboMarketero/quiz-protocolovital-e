import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuizProgress from './QuizProgress';
import Introduction from './screens/Introduction';
import AnalyzingProfile from './screens/AnalyzingProfile';
import WeightGoal from './screens/WeightGoal';
import Symptoms from './screens/Symptoms';
import EmotionalTransition from './screens/EmotionalTransition';
import WeightHistory from './screens/WeightHistory';
import PreviousMethods from './screens/PreviousMethods';
import ParasiteTest from './screens/ParasiteTest';
import Testimonials from './screens/Testimonials';
import ResultsSimulator from './screens/ResultsSimulator';
import CalculatingResults from './screens/CalculatingResults';
import FinalResults from './screens/FinalResults';
import Footer from './Footer';

const Quiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState({
    weightGoal: 6,
    symptoms: [],
    weightHistory: {
      startedGaining: '',
      problemArea: '',
      recentGain: '',
    },
    triedMethods: [],
    parasiteSymptoms: [],
    blockageLevel: 0,
    infestationLevel: 0,
    compatibilityLevel: 0,
  });

  const totalSteps = 12;

  const updateQuizData = (data: Partial<typeof quizData>) => {
    setQuizData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <Introduction onContinue={nextStep} />;
      case 1:
        return (
          <WeightGoal
            weightGoal={quizData.weightGoal}
            updateQuizData={updateQuizData}
            onContinue={nextStep}
          />
        );
      case 2:
        return (
          <Symptoms
            symptoms={quizData.symptoms}
            updateQuizData={updateQuizData}
            onContinue={nextStep}
          />
        );
      case 3:
        return <EmotionalTransition onContinue={nextStep} />;
      case 4:
        return (
          <WeightHistory
            weightHistory={quizData.weightHistory}
            updateQuizData={updateQuizData}
            onContinue={nextStep}
          />
        );
      case 5:
        return (
          <PreviousMethods
            triedMethods={quizData.triedMethods}
            updateQuizData={updateQuizData}
            onContinue={nextStep}
          />
        );
      case 6:
        return (
          <ParasiteTest
            parasiteSymptoms={quizData.parasiteSymptoms}
            updateQuizData={updateQuizData}
            onContinue={nextStep}
          />
        );
      case 7:
        return <Testimonials onContinue={nextStep} />;
      case 8:
        return <ResultsSimulator weightGoal={quizData.weightGoal} onContinue={nextStep} />;
      case 9:
        return <AnalyzingProfile onContinue={nextStep} />;
      case 10:
        return <CalculatingResults onContinue={nextStep} />;
      case 11:
        return <FinalResults quizData={quizData} />;
      default:
        return <Introduction onContinue={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentStep > 0 && currentStep < 11 && (
        <QuizProgress currentStep={currentStep} totalSteps={totalSteps - 2} />
      )}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;