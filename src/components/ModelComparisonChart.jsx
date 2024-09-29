import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ModelComparisonChart = ({ data }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Model Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accuracy" fill="#82ca9d" name="Accuracy (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelComparisonChart;