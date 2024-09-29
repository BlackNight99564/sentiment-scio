import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const SentimentTable = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.influenceScore - a.influenceScore);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Top Influential Posts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Actual Sentiment</TableHead>
            <TableHead>Predicted Sentiment</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Influence</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.slice(0, 10).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.text}</TableCell>
              <TableCell className={`capitalize ${
                item.actualSentiment === 'positive' ? 'text-green-600' :
                item.actualSentiment === 'negative' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {item.actualSentiment}
              </TableCell>
              <TableCell className={`capitalize ${
                item.predictedSentiment === 'positive' ? 'text-green-600' :
                item.predictedSentiment === 'negative' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {item.predictedSentiment}
              </TableCell>
              <TableCell>{item.sentimentScore.toFixed(2)}</TableCell>
              <TableCell>{item.influenceScore}</TableCell>
              <TableCell>{item.platform}</TableCell>
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SentimentTable;