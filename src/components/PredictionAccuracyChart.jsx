import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PredictionAccuracyChart = ({ metrics }) => {
  const chartData = [
    { name: 'Accuracy', value: metrics.accuracy },
    { name: 'Precision', value: metrics.precision },
    { name: 'Recall', value: metrics.recall },
    { name: 'F1 Score', value: metrics.f1Score },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Prediction Accuracy Metrics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" name="Percentage" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionAccuracyChart;