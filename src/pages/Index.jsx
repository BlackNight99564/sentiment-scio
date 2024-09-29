import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SentimentChart from '../components/SentimentChart';
import SentimentTable from '../components/SentimentTable';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { fetchSentimentData } from '../api/sentimentApi';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: sentimentData, isLoading, error } = useQuery({
    queryKey: ['sentimentData', searchTerm],
    queryFn: () => fetchSentimentData(searchTerm),
  });

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Social Media Sentiment Analysis</h1>
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
      <SentimentChart data={sentimentData} />
      <SentimentTable data={sentimentData} />
    </div>
  );
};

export default Index;