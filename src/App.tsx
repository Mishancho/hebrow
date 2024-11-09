import React, { useState, useCallback, useMemo } from 'react';
import { GraduationCap } from 'lucide-react';
import { words } from './data/words';
import { QuizCard } from './components/QuizCard';
import type { HebrewWord } from './data/words';

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<HebrewWord | null>(null);
  const [score, setScore] = useState(0);

  const currentWord = words[currentWordIndex];
  
  const options = useMemo(() => {
    const shuffled = [...words]
      .filter(w => w.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [...shuffled, currentWord]
      .sort(() => Math.random() - 0.5);
  }, [currentWord]);

  const handleAnswer = useCallback((answer: HebrewWord) => {
    setSelectedAnswer(answer);
    if (answer.id === currentWord.id) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(i => i + 1);
        setSelectedAnswer(null);
      }
    }, 2000);
  }, [currentWord.id, currentWordIndex]);

  const isCorrect = selectedAnswer ? selectedAnswer.id === currentWord.id : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Изучаем иврит</h1>
          </div>
          <div className="inline-block px-4 py-2 bg-white rounded-full shadow-sm">
            <span className="text-gray-600">Счёт: </span>
            <span className="font-bold text-indigo-600">{score}</span>
            <span className="text-gray-600"> из </span>
            <span className="font-bold text-indigo-600">{currentWordIndex + 1}</span>
          </div>
        </header>

        <QuizCard
          word={currentWord}
          options={options}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
        />

        <footer className="mt-8 text-center text-sm text-gray-500">
          Учите иврит с удовольствием! 🌟
        </footer>
      </div>
    </div>
  );
}

export default App;