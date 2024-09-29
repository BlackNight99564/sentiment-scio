import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

const SentimentTable = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Individual Post Sentiments</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Sentiment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.text}</TableCell>
              <TableCell className={`capitalize ${
                item.sentiment === 'positive' ? 'text-green-600' :
                item.sentiment === 'negative' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {item.sentiment}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SentimentTable;