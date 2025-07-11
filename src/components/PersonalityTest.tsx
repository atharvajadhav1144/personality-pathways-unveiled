
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  direction: 'positive' | 'negative';
}

interface PersonalityTestProps {
  onComplete: (results: Record<string, number>) => void;
  onBack: () => void;
}

const questions: Question[] = [
  // Extraversion vs Introversion
  { id: 1, text: "You find it easy to introduce yourself to other people", dimension: "EI", direction: "positive" },
  { id: 2, text: "You prefer to spend your free time alone rather than with others", dimension: "EI", direction: "negative" },
  { id: 3, text: "You feel energized after spending time in large groups", dimension: "EI", direction: "positive" },
  { id: 4, text: "You often need quiet time to recharge after social interactions", dimension: "EI", direction: "negative" },
  { id: 5, text: "You enjoy being the center of attention", dimension: "EI", direction: "positive" },
  
  // Sensing vs Intuition
  { id: 6, text: "You focus more on details than the big picture", dimension: "SN", direction: "negative" },
  { id: 7, text: "You prefer concrete facts over abstract theories", dimension: "SN", direction: "negative" },
  { id: 8, text: "You often think about future possibilities", dimension: "SN", direction: "positive" },
  { id: 9, text: "You trust your intuition over logical analysis", dimension: "SN", direction: "positive" },
  { id: 10, text: "You prefer step-by-step instructions", dimension: "SN", direction: "negative" },
  
  // Thinking vs Feeling
  { id: 11, text: "You make decisions based on logic rather than emotions", dimension: "TF", direction: "negative" },
  { id: 12, text: "You consider people's feelings when making decisions", dimension: "TF", direction: "positive" },
  { id: 13, text: "You value harmony in relationships over being right", dimension: "TF", direction: "positive" },
  { id: 14, text: "You remain calm and objective during conflicts", dimension: "TF", direction: "negative" },
  { id: 15, text: "You prioritize fairness over compassion", dimension: "TF", direction: "negative" },
  
  // Judging vs Perceiving
  { id: 16, text: "You prefer to have a plan rather than go with the flow", dimension: "JP", direction: "negative" },
  { id: 17, text: "You enjoy spontaneous activities", dimension: "JP", direction: "positive" },
  { id: 18, text: "You like to finish projects well before the deadline", dimension: "JP", direction: "negative" },
  { id: 19, text: "You work better under pressure", dimension: "JP", direction: "positive" },
  { id: 20, text: "You prefer flexibility over structure in your daily routine", dimension: "JP", direction: "positive" },
];

const PersonalityTest = ({ onComplete, onBack }: PersonalityTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      
      questions.forEach(question => {
        const answer = answers[question.id] || 0;
        const { dimension, direction } = question;
        
        if (dimension === 'EI') {
          if (direction === 'positive') {
            scores.E += answer;
            scores.I += (7 - answer);
          } else {
            scores.I += answer;
            scores.E += (7 - answer);
          }
        } else if (dimension === 'SN') {
          if (direction === 'positive') {
            scores.N += answer;
            scores.S += (7 - answer);
          } else {
            scores.S += answer;
            scores.N += (7 - answer);
          }
        } else if (dimension === 'TF') {
          if (direction === 'positive') {
            scores.F += answer;
            scores.T += (7 - answer);
          } else {
            scores.T += answer;
            scores.F += (7 - answer);
          }
        } else if (dimension === 'JP') {
          if (direction === 'positive') {
            scores.P += answer;
            scores.J += (7 - answer);
          } else {
            scores.J += answer;
            scores.P += (7 - answer);
          }
        }
      });
      
      onComplete(scores);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[questions[currentQuestion].id];

  const scaleLabels = [
    "Strongly Disagree",
    "Disagree", 
    "Slightly Disagree",
    "Neutral",
    "Slightly Agree",
    "Agree",
    "Strongly Agree"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Personality Assessment</h1>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        {/* Question Card */}
        <Card className="personality-card mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center text-gray-800">
              {questions[currentQuestion].text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scale Options */}
            <div className="grid grid-cols-1 gap-3">
              {scaleLabels.map((label, index) => {
                const value = index + 1;
                const isSelected = currentAnswer === value;
                
                return (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`question-option p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300 shadow-md'
                        : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{label}</span>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isSelected 
                          ? 'bg-purple-600 border-purple-600' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{currentQuestion === 0 ? 'Back to Home' : 'Previous'}</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentQuestion
                  ? 'bg-purple-600'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;
