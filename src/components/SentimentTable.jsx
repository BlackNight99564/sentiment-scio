import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const SentimentTable = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Top Influential Posts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Sentiment</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.slice(0, 10).map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.post_content || item.tweet_content || item.video_title}</TableCell>
              <TableCell className={`capitalize ${
                item.sentiment === 'positive' ? 'text-green-600' :
                item.sentiment === 'negative' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {item.sentiment}
              </TableCell>
              <TableCell>{parseFloat(item.sentiment_score).toFixed(2)}</TableCell>
              <TableCell>{item.likes}</TableCell>
              <TableCell>{item.platform}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SentimentTable;