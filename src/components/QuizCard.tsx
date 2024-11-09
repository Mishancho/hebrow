import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { HebrewWord } from '../data/words';

interface QuizCardProps {
  word: HebrewWord;
  options: HebrewWord[];
  onAnswer: (answer: HebrewWord) => void;
  selectedAnswer: HebrewWord | null;
  isCorrect: boolean | null;
}

export function QuizCard({ word, options, onAnswer, selectedAnswer, isCorrect }: QuizCardProps) {
  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{word.russian}</h2>
        <p className="text-sm text-gray-500">Выберите правильный перевод</p>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedAnswer?.id === option.id;
          const isCorrectAnswer = word.id === option.id;
          const showCorrect = selectedAnswer && isCorrectAnswer;
          
          return (
            <button
              key={option.id}
              onClick={() => !selectedAnswer && onAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between
                ${isSelected && isCorrect ? 'bg-green-50 border-green-500' : ''}
                ${isSelected && !isCorrect ? 'bg-red-50 border-red-500' : ''}
                ${showCorrect && !isSelected ? 'bg-green-50 border-green-500' : ''}
                ${!selectedAnswer ? 'hover:border-blue-500 border-gray-200' : ''}
                ${!isSelected && !showCorrect ? 'border-gray-200' : ''}
              `}
            >
              <div className="text-left">
                <div className="text-xl font-bold text-gray-800 mb-1 font-hebrew">
                  {option.hebrew}
                </div>
                <div className="text-sm text-gray-600">{option.transcription}</div>
              </div>
              
              {isSelected && isCorrect && (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
              {isSelected && !isCorrect && (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              {showCorrect && !isSelected && (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}