import { faker } from '@faker-js/faker';

const generateMockData = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    text: faker.lorem.sentence(),
    sentiment: faker.helpers.arrayElement(['positive', 'neutral', 'negative']),
    score: faker.number.float({ min: -1, max: 1, precision: 0.01 }),
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
      resolve(filteredData);
    }, 500);
  });
};