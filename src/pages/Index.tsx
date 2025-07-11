
import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import PersonalityTest from '@/components/PersonalityTest';
import PersonalityResults from '@/components/PersonalityResults';

type AppState = 'landing' | 'test' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [testResults, setTestResults] = useState<Record<string, number> | null>(null);

  const handleStartTest = () => {
    setCurrentState('test');
  };

  const handleTestComplete = (results: Record<string, number>) => {
    setTestResults(results);
    setCurrentState('results');
  };

  const handleRetakeTest = () => {
    setTestResults(null);
    setCurrentState('test');
  };

  const handleBackToHome = () => {
    setCurrentState('landing');
    setTestResults(null);
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
  };

  switch (currentState) {
    case 'test':
      return (
        <PersonalityTest 
          onComplete={handleTestComplete} 
          onBack={handleBackToLanding}
        />
      );
    case 'results':
      return testResults ? (
        <PersonalityResults 
          scores={testResults} 
          onRetake={handleRetakeTest}
          onBackToHome={handleBackToHome}
        />
      ) : null;
    default:
      return <LandingPage onStartTest={handleStartTest} />;
  }
};

export default Index;
