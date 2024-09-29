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

const calculateMetrics = (data) => {
  const total = data.length;
  const correct = data.filter(item => item.actualSentiment === item.predictedSentiment).length;
  const accuracy = (correct / total) * 100;

  const confusionMatrix = {
    'true_positive': 0,
    'false_positive': 0,
    'true_negative': 0,
    'false_negative': 0
  };

  data.forEach(item => {
    if (item.actualSentiment === 'positive' && item.predictedSentiment === 'positive') {
      confusionMatrix.true_positive++;
    } else if (item.actualSentiment === 'negative' && item.predictedSentiment === 'positive') {
      confusionMatrix.false_positive++;
    } else if (item.actualSentiment === 'negative' && item.predictedSentiment === 'negative') {
      confusionMatrix.true_negative++;
    } else if (item.actualSentiment === 'positive' && item.predictedSentiment === 'negative') {
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

export const fetchSentimentData = (searchTerm) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = searchTerm
        ? mockData.filter(item => item.text.toLowerCase().includes(searchTerm.toLowerCase()))
        : mockData;
      
      const metrics = calculateMetrics(filteredData);
      
      resolve({ data: filteredData, metrics });
    }, 500);
  });
};

export const fetchModelComparison = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const models = ['Logistic Regression', 'Decision Tree', 'KNN'];
      const modelComparison = models.map(model => ({
        name: model,
        accuracy: faker.number.float({ min: 70, max: 95, precision: 0.1 })
      }));
      resolve(modelComparison);
    }, 500);
  });
};