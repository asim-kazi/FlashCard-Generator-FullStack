import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, Brain, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import StatsPanel from '../components/flashcard/StatsPanel';

const Home = memo(() => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Advanced NLP algorithms extract key concepts automatically',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate flashcards in seconds, not hours',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'Smart Summaries',
      description:
        'PageRank algorithm identifies the most important information',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Learning</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="block text-white">Master Any Subject</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                With Smart Flashcards
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed">
              Transform your study materials into AI-generated flashcards
              instantly. Extract key concepts from text or images with
              cutting-edge NLP technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                icon={ArrowRight}
                onClick={() => navigate('/generator')}
                className="min-w-[200px]"
              >
                Get Started Free
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById('features')
                    .scrollIntoView({ behavior: 'smooth' })
                }
                className="min-w-[200px]"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} variant="glass" hover className="text-center">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <StatsPanel />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm space-y-2">
            <p className="font-medium">Smart Flashcard Generator</p>
            <p>© 2026 Asim Kazi & Chinmay Keripale</p>
          </div>
        </div>
      </footer>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
