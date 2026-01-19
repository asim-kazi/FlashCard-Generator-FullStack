import { useEffect, useState } from 'react';
import { getStatistics } from '../api/flashcards';

const StatsPanel = () => {
  const [stats, setStats] = useState({
    total_flashcards_generated: 0,
    total_texts_processed: 0,
    total_images_processed: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const statItems = [
    {
      label: 'Flashcards Generated',
      value: stats.total_flashcards_generated,
      icon: '🎴',
    },
    {
      label: 'Texts Processed',
      value: stats.total_texts_processed,
      icon: '📝',
    },
    {
      label: 'Images Processed',
      value: stats.total_images_processed,
      icon: '🖼️',
    },
  ];

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-blue-400 mb-4">📊 Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900/50 rounded-lg p-4 text-center border border-gray-700/50"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-2xl font-bold text-blue-400">{item.value}</div>
            <div className="text-sm text-gray-400 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
