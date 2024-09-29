import React from 'react';
import { useSentimentData, calculateMetrics } from '../api/sentimentApi';
import SentimentChart from '../components/SentimentChart';
import TopicModelingChart from '../components/TopicModelingChart';
import SentimentTable from '../components/SentimentTable';
import PredictionAccuracyChart from '../components/PredictionAccuracyChart';
import ModelComparisonChart from '../components/ModelComparisonChart';

const Index = () => {
  const { data, isLoading, error } = useSentimentData();
  
  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  const metrics = calculateMetrics(data);

  const modelComparisonData = [
    { name: 'Model A', accuracy: 85 },
    { name: 'Model B', accuracy: 78 },
    { name: 'Model C', accuracy: 92 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Social Media Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SentimentChart data={data} />
        <TopicModelingChart data={data} />
      </div>
      <PredictionAccuracyChart metrics={metrics} />
      <ModelComparisonChart data={modelComparisonData} />
      <SentimentTable data={data} />
    </div>
  );
};

export default Index;