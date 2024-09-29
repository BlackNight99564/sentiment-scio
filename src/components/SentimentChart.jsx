import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SentimentChart = ({ data }) => {
  const chartData = [
    { name: 'Positive', value: data.filter(item => item.sentiment === 'positive').length },
    { name: 'Neutral', value: data.filter(item => item.sentiment === 'neutral').length },
    { name: 'Negative', value: data.filter(item => item.sentiment === 'negative').length },
  ];

  const averageSentiment = data.reduce((acc, item) => acc + item.score, 0) / data.length;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Sentiment Analysis</h2>
      <p className="mb-4">Average Sentiment Score: {averageSentiment.toFixed(2)}</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;