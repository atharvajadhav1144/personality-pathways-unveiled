
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Users, Star, ArrowRight, Lightbulb, Heart, Briefcase } from 'lucide-react';

interface LandingPageProps {
  onStartTest: () => void;
}

const LandingPage = ({ onStartTest }: LandingPageProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah M.",
      type: "INFP",
      text: "This test helped me understand why I think the way I do. The career recommendations were spot-on!"
    },
    {
      name: "James R.",
      type: "ESTJ",
      text: "Finally found my leadership style and learned how to work better with my team."
    },
    {
      name: "Maya K.",
      type: "ENFP",
      text: "The personality insights changed how I approach relationships and decision-making."
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "Scientific Accuracy",
      description: "Based on Carl Jung's psychological types and decades of research"
    },
    {
      icon: Users,
      title: "Personal Growth",
      description: "Discover your strengths, preferences, and areas for development"
    },
    {
      icon: Briefcase,
      title: "Career Guidance",
      description: "Get personalized career recommendations based on your personality type"
    },
    {
      icon: Heart,
      title: "Relationship Insights",
      description: "Understand your communication style and relationship compatibility"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <Brain className="relative h-20 w-20 text-purple-600" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Discover Your
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}True Self
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take our comprehensive personality test and unlock insights into your unique traits, 
              ideal careers, and perfect relationships. Join millions who've discovered their path.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={onStartTest}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Free Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span>Trusted by 2M+ people worldwide</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="text-2xl font-bold text-purple-600">12 Minutes</div>
                <div className="text-gray-600">Average completion time</div>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-2xl font-bold text-blue-600">16 Types</div>
                <div className="text-gray-600">Distinct personality profiles</div>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-2xl font-bold text-indigo-600">93% Accuracy</div>
                <div className="text-gray-600">Research-backed results</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Personality Test?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get deeper insights into your personality with our scientifically-backed assessment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="personality-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What People Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real people who discovered themselves
            </p>
          </div>

          <div className="relative">
            <Card className="personality-card p-8 text-center">
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-700 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-purple-600 font-medium">
                    Personality Type: {testimonials[currentTestimonial].type}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'bg-purple-600 scale-110' 
                      : 'bg-gray-300 hover:bg-purple-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Personality?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join millions who have unlocked their potential. Your journey of self-discovery starts here.
          </p>
          
          <Button 
            onClick={onStartTest}
            size="lg"
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Begin Your Journey
            <Lightbulb className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
