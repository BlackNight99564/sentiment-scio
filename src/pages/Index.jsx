import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SentimentChart from '../components/SentimentChart';
import TopicModelingChart from '../components/TopicModelingChart';
import SentimentTable from '../components/SentimentTable';
import PredictionAccuracyChart from '../components/PredictionAccuracyChart';
import ModelComparisonChart from '../components/ModelComparisonChart';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { fetchSentimentData, fetchModelComparison } from '../api/sentimentApi';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: sentimentAnalysis, isLoading: isLoadingSentiment, error: sentimentError } = useQuery({
    queryKey: ['sentimentData', searchTerm],
    queryFn: () => fetchSentimentData(searchTerm),
  });

  const { data: modelComparison, isLoading: isLoadingComparison, error: comparisonError } = useQuery({
    queryKey: ['modelComparison'],
    queryFn: fetchModelComparison,
  });

  if (isLoadingSentiment || isLoadingComparison) return <div className="text-center mt-8">Loading...</div>;
  if (sentimentError || comparisonError) return <div className="text-center mt-8 text-red-500">Error: {sentimentError?.message || comparisonError?.message}</div>;

  const { data: sentimentData, metrics } = sentimentAnalysis;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Social Media Analytics Dashboard</h1>
      <div className="mb-6 flex">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button onClick={() => setSearchTerm(searchTerm)}>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SentimentChart data={sentimentData} />
        <TopicModelingChart data={sentimentData} />
      </div>
      <PredictionAccuracyChart metrics={metrics} />
      <ModelComparisonChart data={modelComparison} />
      <SentimentTable data={sentimentData} />
    </div>
  );
};

export default Index;