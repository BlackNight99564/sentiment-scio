import { useState, useEffect } from 'react';

const parseCsvData = (csvText) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
  });
};

const fetchDataFromFile = async (filePath) => {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    return parseCsvData(text);
  } catch (error) {
    console.error(`Error fetching data from ${filePath}:`, error);
    return [];
  }
};

export const useSentimentData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const instagramData = await fetchDataFromFile('/src/data/instagram_demo.txt');
        const facebookData = await fetchDataFromFile('/src/data/facebook_demo.txt');
        const youtubeData = await fetchDataFromFile('/src/data/youtube_demo.txt');
        const twitterData = await fetchDataFromFile('/src/data/twitter_demo.txt');
        const linkedinData = await fetchDataFromFile('/src/data/linkedin_demo.txt');

        setData([
          ...instagramData.map(item => ({ ...item, platform: 'Instagram' })),
          ...facebookData.map(item => ({ ...item, platform: 'Facebook' })),
          ...youtubeData.map(item => ({ ...item, platform: 'YouTube' })),
          ...twitterData.map(item => ({ ...item, platform: 'Twitter' })),
          ...linkedinData.map(item => ({ ...item, platform: 'LinkedIn' }))
        ]);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { data, isLoading, error };
};

export const calculateMetrics = (data) => {
  const total = data.length;
  const sentiments = data.map(item => ({
    actual: item.sentiment,
    predicted: item.sentiment_score > 0 ? 'positive' : item.sentiment_score < 0 ? 'negative' : 'neutral'
  }));

  const correct = sentiments.filter(item => item.actual === item.predicted).length;
  const accuracy = (correct / total) * 100;

  const confusionMatrix = {
    true_positive: 0,
    false_positive: 0,
    true_negative: 0,
    false_negative: 0
  };

  sentiments.forEach(item => {
    if (item.actual === 'positive' && item.predicted === 'positive') {
      confusionMatrix.true_positive++;
    } else if (item.actual === 'negative' && item.predicted === 'positive') {
      confusionMatrix.false_positive++;
    } else if (item.actual === 'negative' && item.predicted === 'negative') {
      confusionMatrix.true_negative++;
    } else if (item.actual === 'positive' && item.predicted === 'negative') {
      confusionMatrix.false_negative++;
    }
  });

  const precision = confusionMatrix.true_positive / (confusionMatrix.true_positive + confusionMatrix.false_positive);
  const recall = confusionMatrix.true_positive / (confusionMatrix.true_positive + confusionMatrix.false_negative);
  const f1Score = 2 * ((precision * recall) / (precision + recall));

  return {
    accuracy,
    precision: precision * 100,
    recall: recall * 100,
    f1Score: f1Score * 100,
    confusionMatrix
  };
};