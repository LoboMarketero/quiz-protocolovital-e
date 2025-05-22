import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsProps {
  onContinue: () => void;
}

const testimonials = [
  {
    id: 1,
    name: 'Helena Silva',
    location: 'São Paulo, SP',
    weightLoss: '8kg em 21 dias',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'Em duas semanas, minha barriga desinchou e eu voltei a usar minhas roupas antigas. Finalmente entendi o que estava bloqueando meu emagrecimento!',
  },
  {
    id: 2,
    name: 'Renata Almeida',
    location: 'Belo Horizonte, MG',
    weightLoss: '6kg em 15 dias',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'Tentei de tudo antes e nada funcionava. O Protocolo 4F foi a única coisa que realmente me ajudou a emagrecer de forma sustentável.',
  },
  {
    id: 3,
    name: 'Luiza Mendes',
    location: 'Fortaleza, CE',
    weightLoss: '11kg em 28 dias',
    image: 'https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'Depois de tratar os parasitas intestinais, minha energia voltou e o peso começou a cair naturalmente. É incrível como me sinto melhor!',
  },
];

const Testimonials: React.FC<TestimonialsProps> = ({ onContinue }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
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
          Histórias de sucesso reais
        </h2>
        
        <p className="mb-6 text-center">
          Veja como outras mulheres transformaram suas vidas com o Protocolo 4F:
        </p>

        <div className="relative mb-6">
          <div className="overflow-hidden relative h-[500px] rounded-lg">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full"
              >
                <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-card p-4 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm"
                    />
                    <div>
                      <h3 className="font-montserrat font-semibold">
                        {testimonials[current].name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {testimonials[current].location}
                      </p>
                      <p className="text-sm font-semibold text-primary-700">
                        {testimonials[current].weightLoss}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex-grow">
                    <p className="italic text-lg mb-2">
                      "{testimonials[current].text}"
                    </p>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-4">
                    <p className="text-sm">
                      <span className="font-semibold">Notas da Dra. Mariana:</span> Este é um resultado típico após o tratamento completo com o Protocolo 4F. A eliminação dos parasitas permitiu que o corpo voltasse a responder naturalmente aos esforços de emagrecimento.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
          >
            <ChevronLeft size={20} className="text-primary-800" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md"
          >
            <ChevronRight size={20} className="text-primary-800" />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === current ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button onClick={onContinue}>
          EU QUERO RESULTADOS ASSIM
        </Button>
      </Card>
    </motion.div>
  );
};

export default Testimonials;