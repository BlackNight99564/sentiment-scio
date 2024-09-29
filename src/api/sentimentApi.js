import { faker } from '@faker-js/faker';

const generateMockData = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    text: faker.lorem.sentence(),
    actualSentiment: faker.helpers.arrayElement(['positive', 'neutral', 'negative']),
    predictedSentiment: faker.helpers.arrayElement(['positive', 'neutral', 'negative']),
    sentimentScore: faker.number.float({ min: -1, max: 1, precision: 0.01 }),
    topics: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.word.noun()),
    influenceScore: faker.number.int({ min: 1, max: 100 }),
    platform: faker.helpers.arrayElement(['Twitter', 'Facebook', 'Instagram']),
    date: faker.date.recent({ days: 30 }).toISOString(),
  }));
};

const mockData = generateMockData(100);

export const fetchSentimentData = (searchTerm) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = searchTerm
        ? mockData.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
        : mockData;
      
      const accuracyMetrics = calculateAccuracyMetrics(filteredData);
      
      resolve({ data: filteredData, metrics: accuracyMetrics });
    }, 500);
  });
};

const calculateAccuracyMetrics = (data) => {
  let correct = 0;
  let total = data.length;
  
  data.forEach(item => {
    if (item.actualSentiment === item.predictedSentiment) {
      correct++;
    }
  });
  
  const accuracy = (correct / total) * 100;
  const precision = calculatePrecision(data);
  const recall = calculateRecall(data);
  const f1Score = 2 * ((precision * recall) / (precision + recall));
  
  return { accuracy, precision, recall, f1Score };
};

const calculatePrecision = (data) => {
  // Simplified precision calculation for positive sentiment
  const truePositives = data.filter(item => item.actualSentiment === 'positive' && item.predictedSentiment === 'positive').length;
  const falsePositives = data.filter(item => item.actualSentiment !== 'positive' && item.predictedSentiment === 'positive').length;
  return truePositives / (truePositives + falsePositives);
};

const calculateRecall = (data) => {
  // Simplified recall calculation for positive sentiment
  const truePositives = data.filter(item => item.actualSentiment === 'positive' && item.predictedSentiment === 'positive').length;
  const falseNegatives = data.filter(item => item.actualSentiment === 'positive' && item.predictedSentiment !== 'positive').length;
  return truePositives / (truePositives + falseNegatives);
};