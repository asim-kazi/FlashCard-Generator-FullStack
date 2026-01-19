import { memo, useEffect, useState } from 'react';
import { TrendingUp, FileText, Image, Sparkles } from 'lucide-react';
import { getStatistics } from '../../api/flashcards';
import Card from '../common/Card';

const StatsPanel = memo(() => {
  const [stats, setStats] = useState({
    total_flashcards_generated: 0,
    total_texts_processed: 0,
    total_images_processed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      label: 'Flashcards',
      value: stats.total_flashcards_generated,
      icon: Sparkles,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Texts',
      value: stats.total_texts_processed,
      icon: FileText,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Images',
      value: stats.total_images_processed,
      icon: Image,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  if (loading) {
    return (
      <Card variant="glass">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/2" />
          <div className="grid grid-cols-1 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-bold text-gray-200">Statistics</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl p-4 bg-gray-900/50 border border-gray-700/50
                         hover:border-gray-600 transition-all duration-300"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-lg bg-gradient-to-br ${item.gradient}`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-white">
                    {item.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
});

StatsPanel.displayName = 'StatsPanel';

export default StatsPanel;
