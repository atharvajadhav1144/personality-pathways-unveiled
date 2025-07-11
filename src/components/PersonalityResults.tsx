
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, BookOpen, Film, Briefcase, Heart, RotateCcw, Share2 } from 'lucide-react';

interface PersonalityResultsProps {
  scores: Record<string, number>;
  onRetake: () => void;
  onBackToHome: () => void;
}

const personalityTypes = {
  'INTJ': {
    name: 'The Architect',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    traits: ['Independent', 'Decisive', 'Hard-working', 'Determined'],
    strengths: ['Strategic thinking', 'Independent', 'Decisive', 'Hard-working', 'Determined'],
    weaknesses: ['Arrogant', 'Judgmental', 'Overly analytical', 'Loathe highly structured environments'],
    careers: ['Software Developer', 'Engineer', 'Scientist', 'Architect', 'Investment Banker'],
    books: ['The 7 Habits of Highly Effective People', 'Thinking, Fast and Slow', 'The Art of War'],
    movies: ['The Social Network', 'A Beautiful Mind', 'The Imitation Game'],
    compatible: ['ENFP', 'ENTP', 'INFJ', 'INFP']
  },
  'INTP': {
    name: 'The Thinker',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    traits: ['Logical', 'Original', 'Creative', 'Independent'],
    strengths: ['Great analysts and abstract thinkers', 'Imaginative and original', 'Open-minded', 'Enthusiastic'],
    weaknesses: ['Very private and withdrawn', 'Insensitive', 'Absent-minded', 'Condescending'],
    careers: ['Research Scientist', 'Mathematician', 'Philosopher', 'Software Engineer', 'Professor'],
    books: ['Gödel, Escher, Bach', 'The Elegant Universe', 'A Brief History of Time'],
    movies: ['Good Will Hunting', 'The Theory of Everything', 'Ex Machina'],
    compatible: ['ENTJ', 'ESTJ', 'INFJ', 'ENFJ']
  },
  'ENTJ': {
    name: 'The Commander',
    description: 'Bold, imaginative and strong-willed leaders.',
    traits: ['Confident', 'Strategic', 'Charismatic', 'Inspiring'],
    strengths: ['Efficient', 'Energetic', 'Self-confident', 'Strong-willed'],
    weaknesses: ['Stubborn and dominant', 'Intolerant', 'Impatient', 'Arrogant'],
    careers: ['CEO', 'Entrepreneur', 'Judge', 'Lawyer', 'Investment Banker'],
    books: ['Good to Great', 'The Lean Startup', 'Zero to One'],
    movies: ['The Wolf of Wall Street', 'Steve Jobs', 'The Big Short'],
    compatible: ['INTP', 'INFP', 'INTJ', 'INFJ']
  },
  'ENTP': {
    name: 'The Debater',
    description: 'Quick, ingenious, stimulating, alert, and outspoken.',
    traits: ['Innovative', 'Enthusiastic', 'Strategic', 'Charismatic'],
    strengths: ['Knowledgeable', 'Quick thinkers', 'Original', 'Excellent brainstormers'],
    weaknesses: ['Very argumentative', 'Insensitive', 'Intolerant', 'Find it difficult to focus'],
    careers: ['Journalist', 'Entrepreneur', 'Lawyer', 'Psychologist', 'Inventor'],
    books: ['The Innovator\'s Dilemma', 'Purple Cow', 'The Art of Possibility'],
    movies: ['Thank You for Smoking', 'The Devil Wears Prada', 'Catch Me If You Can'],
    compatible: ['INTJ', 'INFJ', 'INTP', 'INFP']
  },
  'INFJ': {
    name: 'The Advocate',
    description: 'Creative, insightful, and inspired idealists.',
    traits: ['Insightful', 'Inspiring', 'Decisive', 'Determined'],
    strengths: ['Creative', 'Insightful', 'Inspiring and convincing', 'Decisive'],
    weaknesses: ['Sensitive', 'Extremely private', 'Perfectionist', 'Always need to have a cause'],
    careers: ['Counselor', 'Writer', 'Teacher', 'Psychologist', 'Social Worker'],
    books: ['Man\'s Search for Meaning', 'The Alchemist', 'To Kill a Mockingbird'],
    movies: ['Dead Poets Society', 'The Pursuit of Happyness', 'Schindler\'s List'],
    compatible: ['ENFP', 'ENTP', 'INTJ', 'INFP']
  },
  'INFP': {
    name: 'The Mediator',
    description: 'Quiet, open-minded, imaginative, and caring.',
    traits: ['Loyal', 'Sensitive', 'Kind', 'Creative'],
    strengths: ['Passionate and energetic', 'Dedicated and hard-working', 'Flexible and relaxed'],
    weaknesses: ['Too idealistic', 'Too altruistic', 'Impractical', 'Dislike dealing with data'],
    careers: ['Writer', 'Artist', 'Counselor', 'Teacher', 'Psychologist'],
    books: ['The Little Prince', 'Eat, Pray, Love', 'Big Magic'],
    movies: ['Her', 'Inside Out', 'The Secret Life of Walter Mitty'],
    compatible: ['ENFJ', 'ENTJ', 'INFJ', 'ENFP']
  },
  'ENFJ': {
    name: 'The Protagonist',
    description: 'Inspiring and charismatic leaders, able to mesmerize listeners.',
    traits: ['Charismatic', 'Inspiring', 'Natural leader', 'Passionate'],
    strengths: ['Tolerant', 'Reliable', 'Charismatic', 'Altruistic'],
    weaknesses: ['Overly idealistic', 'Too selfless', 'Too sensitive', 'Fluctuating self-esteem'],
    careers: ['Teacher', 'Counselor', 'Coach', 'Politician', 'Social Worker'],
    books: ['How to Win Friends and Influence People', 'The 5 Love Languages', 'Daring Greatly'],
    movies: ['Freedom Writers', 'Coach Carter', 'Remember the Titans'],
    compatible: ['INFP', 'ISFP', 'INTP', 'INFJ']
  },
  'ENFP': {
    name: 'The Campaigner',
    description: 'Enthusiastic, creative and sociable free spirits.',
    traits: ['Enthusiastic', 'Creative', 'Spontaneous', 'Charismatic'],
    strengths: ['Enthusiastic', 'Creative', 'Sociable', 'Energetic'],
    weaknesses: ['Poor practical skills', 'Find it difficult to focus', 'Overthink things', 'Get stressed easily'],
    careers: ['Journalist', 'Actor', 'Teacher', 'Counselor', 'Event Planner'],
    books: ['The Power of Now', 'Big Magic', 'Yes Please'],
    movies: ['Yes Man', 'La La Land', 'The Greatest Showman'],
    compatible: ['INTJ', 'INFJ', 'INTP', 'INFP']
  },
  'ISTJ': {
    name: 'The Logistician',
    description: 'Practical and fact-minded, reliable and responsible.',
    traits: ['Responsible', 'Sincere', 'Analytical', 'Reserved'],
    strengths: ['Honest and direct', 'Strong-willed', 'Dutiful', 'Very responsible'],
    weaknesses: ['Stubborn', 'Insensitive', 'Always by the book', 'Judgmental'],
    careers: ['Accountant', 'Engineer', 'Doctor', 'Lawyer', 'Military Officer'],
    books: ['The 7 Habits of Highly Effective People', 'Getting Things Done', 'The E-Myth'],
    movies: ['The Accountant', 'Moneyball', 'A Few Good Men'],
    compatible: ['ESFP', 'ESTP', 'ISFP', 'ISTP']
  },
  'ISFJ': {
    name: 'The Protector',
    description: 'Very dedicated and warm protectors, always ready to defend loved ones.',
    traits: ['Warm', 'Considerate', 'Gentle', 'Responsible'],
    strengths: ['Supportive', 'Reliable and patient', 'Imaginative and observant', 'Enthusiastic'],
    weaknesses: ['Humble and shy', 'Take things too personally', 'Repress their feelings', 'Overload themselves'],
    careers: ['Nurse', 'Teacher', 'Social Worker', 'Counselor', 'Administrator'],
    books: ['The Gifts of Imperfection', 'The 5 Love Languages', 'Quiet'],
    movies: ['The Help', 'Wonder', 'The Blind Side'],
    compatible: ['ESFP', 'ESTP', 'ENFP', 'ENTP']
  },
  'ESTJ': {
    name: 'The Executive',
    description: 'Excellent administrators, unsurpassed at managing things or people.',
    traits: ['Organized', 'Traditional', 'Leaders', 'Dedicated'],
    strengths: ['Dedicated', 'Strong-willed', 'Direct and honest', 'Loyal'],
    weaknesses: ['Inflexible and stubborn', 'Uncomfortable with unconventional situations', 'Judgmental', 'Too focused on social status'],
    careers: ['Manager', 'Administrator', 'Judge', 'Teacher', 'Police Officer'],
    books: ['Good to Great', 'The 7 Habits of Highly Effective People', 'Leadership in Turbulent Times'],
    movies: ['The Devil Wears Prada', 'Wall Street', 'Jerry Maguire'],
    compatible: ['ISFP', 'ISTP', 'INTP', 'INFP']
  },
  'ESFJ': {
    name: 'The Consul',
    description: 'Extraordinarily caring, social and popular people, always eager to help.',
    traits: ['Caring', 'Social', 'Popular', 'Sympathetic'],
    strengths: ['Strong practical skills', 'Strong sense of duty', 'Very loyal', 'Sensitive and warm'],
    weaknesses: ['Worried about their social status', 'Inflexible', 'Reluctant to innovate', 'Vulnerable to criticism'],
    careers: ['Teacher', 'Nurse', 'Social Worker', 'Counselor', 'Event Coordinator'],
    books: ['The 5 Love Languages', 'How to Win Friends and Influence People', 'The Happiness Project'],
    movies: ['The Proposal', 'Julie & Julia', 'Mamma Mia!'],
    compatible: ['ISFP', 'ISTP', 'INFP', 'INTP']
  },
  'ISTP': {
    name: 'The Virtuoso',
    description: 'Bold and practical experimenters, masters of all kinds of tools.',
    traits: ['Independent', 'Realistic', 'Practical', 'Reserved'],
    strengths: ['Optimistic and energetic', 'Creative and practical', 'Spontaneous and rational', 'Know how to prioritize'],
    weaknesses: ['Stubborn', 'Insensitive', 'Private and reserved', 'Easily bored'],
    careers: ['Mechanic', 'Engineer', 'Pilot', 'Chef', 'Athlete'],
    books: ['Zen and the Art of Motorcycle Maintenance', 'The Lean Startup', 'Flow'],
    movies: ['Ford v Ferrari', 'Top Gun', 'Rush'],
    compatible: ['ESFJ', 'ESTJ', 'ISFJ', 'ISTJ']
  },
  'ISFP': {
    name: 'The Adventurer',
    description: 'Flexible and charming artists, always ready to explore new possibilities.',
    traits: ['Gentle', 'Sensitive', 'Creative', 'Passionate'],
    strengths: ['Charming', 'Sensitive to others', 'Imaginative', 'Passionate'],
    weaknesses: ['Fiercely independent', 'Unpredictable', 'Easily stressed', 'Overly competitive'],
    careers: ['Artist', 'Musician', 'Designer', 'Photographer', 'Chef'],
    books: ['Big Magic', 'The Artist\'s Way', 'Wild'],
    movies: ['Lost in Translation', 'Amélie', 'The Shape of Water'],
    compatible: ['ESFJ', 'ESTJ', 'ENFJ', 'ENTJ']
  },
  'ESTP': {
    name: 'The Entrepreneur',
    description: 'Smart, energetic and perceptive people, truly enjoy living on the edge.',
    traits: ['Energetic', 'Practical', 'Spontaneous', 'Adaptable'],
    strengths: ['Bold', 'Rational and practical', 'Original', 'Perceptive'],
    weaknesses: ['Insensitive', 'Impatient', 'Risk-prone', 'Unstructured'],
    careers: ['Entrepreneur', 'Sales Representative', 'Marketing Manager', 'Athlete', 'Paramedic'],
    books: ['The Lean Startup', 'The 4-Hour Workweek', 'Never Eat Alone'],
    movies: ['The Wolf of Wall Street', 'Ocean\'s Eleven', 'The Fast and the Furious'],
    compatible: ['ISFJ', 'ISTJ', 'ISFP', 'ISTP']
  },
  'ESFP': {
    name: 'The Entertainer',
    description: 'Spontaneous, energetic and enthusiastic people - life is never boring.',
    traits: ['Enthusiastic', 'Spontaneous', 'Creative', 'People-focused'],
    strengths: ['Bold', 'Original', 'Aesthetics and showmanship', 'Practical'],
    weaknesses: ['Sensitive', 'Conflict-averse', 'Poor long-term planners', 'Unfocused'],
    careers: ['Actor', 'Artist', 'Teacher', 'Social Worker', 'Event Planner'],
    books: ['The Happiness Project', 'Yes Please', 'Eat, Pray, Love'],
    movies: ['Mamma Mia!', 'The Greatest Showman', 'Pitch Perfect'],
    compatible: ['ISFJ', 'ISTJ', 'INFJ', 'INTJ']
  }
};

const PersonalityResults = ({ scores, onRetake, onBackToHome }: PersonalityResultsProps) => {
  // Determine personality type
  const personalityType = 
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');

  const typeInfo = personalityTypes[personalityType as keyof typeof personalityTypes];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I'm ${typeInfo.name} (${personalityType})!`,
        text: `I just discovered my personality type: ${typeInfo.name}. ${typeInfo.description}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Brain className="relative h-16 w-16 text-purple-600" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Your Personality Type
          </h1>
          
          <div className="space-y-2">
            <Badge variant="secondary" className="text-2xl px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              {personalityType}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {typeInfo.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {typeInfo.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button onClick={onRetake} variant="outline" className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4" />
              <span>Retake Test</span>
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share Results</span>
            </Button>
            <Button onClick={onBackToHome} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Back to Home
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traits & Characteristics */}
          <div className="space-y-6">
            <Card className="personality-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>Key Traits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {typeInfo.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="personality-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-green-700">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {typeInfo.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="personality-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-orange-700">Areas for Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {typeInfo.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <Card className="personality-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <span>Career Matches</span>
                </CardTitle>
                <CardDescription>Careers that align with your personality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {typeInfo.careers.map((career, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg text-center text-blue-800 font-medium">
                      {career}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="personality-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>Recommended Books</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {typeInfo.books.map((book, index) => (
                    <li key={index} className="p-2 bg-green-50 rounded text-green-800">
                      {book}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="personality-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Film className="h-5 w-5 text-purple-600" />
                  <span>Movies You Might Enjoy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {typeInfo.movies.map((movie, index) => (
                    <li key={index} className="p-2 bg-purple-50 rounded text-purple-800">
                      {movie}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="personality-card animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span>Compatible Types</span>
                </CardTitle>
                <CardDescription>Personality types you tend to connect well with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {typeInfo.compatible.map((type, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Score Breakdown */}
        <Card className="personality-card mt-8 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <CardHeader>
            <CardTitle>Your Score Breakdown</CardTitle>
            <CardDescription>How you scored on each personality dimension</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {scores.E > scores.I ? 'E' : 'I'}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {scores.E > scores.I ? 'Extraversion' : 'Introversion'}
                </div>
                <div className="text-xs text-gray-500">
                  E: {scores.E} | I: {scores.I}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {scores.S > scores.N ? 'S' : 'N'}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {scores.S > scores.N ? 'Sensing' : 'Intuition'}
                </div>
                <div className="text-xs text-gray-500">
                  S: {scores.S} | N: {scores.N}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {scores.T > scores.F ? 'T' : 'F'}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {scores.T > scores.F ? 'Thinking' : 'Feeling'}
                </div>
                <div className="text-xs text-gray-500">
                  T: {scores.T} | F: {scores.F}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {scores.J > scores.P ? 'J' : 'P'}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {scores.J > scores.P ? 'Judging' : 'Perceiving'}
                </div>
                <div className="text-xs text-gray-500">
                  J: {scores.J} | P: {scores.P}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalityResults;
