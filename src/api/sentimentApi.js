import { faker } from '@faker-js/faker';

const generateMockData = (platform, count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    platform: platform,
    username: faker.internet.userName(),
    postContent: faker.lorem.sentence(),
    sentiment: faker.helpers.arrayElement(['positive', 'neutral', 'negative']),
    sentimentScore: faker.number.float({ min: -1, max: 1, precision: 0.01 }),
    engagement: {
      likes: faker.number.int({ min: 0, max: 10000 }),
      comments: faker.number.int({ min: 0, max: 1000 }),
      shares: faker.number.int({ min: 0, max: 500 }),
    },
    followers: faker.number.int({ min: 100, max: 1000000 }),
    date: faker.date.recent({ days: 30 }).toISOString(),
    // Platform-specific fields
    ...(platform === 'Instagram' && {
      imageUrl: faker.image.url(),
      filter: faker.helpers.arrayElement(['Normal', 'Clarendon', 'Gingham', 'Moon', 'Lark']),
    }),
    ...(platform === 'Facebook' && {
      pageCategory: faker.helpers.arrayElement(['Personal', 'Business', 'Community', 'Brand']),
      reactionTypes: {
        like: faker.number.int({ min: 0, max: 5000 }),
        love: faker.number.int({ min: 0, max: 2000 }),
        haha: faker.number.int({ min: 0, max: 1000 }),
        wow: faker.number.int({ min: 0, max: 500 }),
        sad: faker.number.int({ min: 0, max: 200 }),
        angry: faker.number.int({ min: 0, max: 100 }),
      },
    }),
    ...(platform === 'YouTube' && {
      videoTitle: faker.lorem.sentence(),
      videoLength: faker.number.int({ min: 30, max: 3600 }), // in seconds
      views: faker.number.int({ min: 100, max: 1000000 }),
      subscriberCount: faker.number.int({ min: 0, max: 100000 }),
    }),
    ...(platform === 'Twitter' && {
      retweetCount: faker.number.int({ min: 0, max: 10000 }),
      hashTags: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => faker.word.hashtag()),
    }),
    ...(platform === 'LinkedIn' && {
      companyName: faker.company.name(),
      industry: faker.company.buzzPhrase(),
      connections: faker.number.int({ min: 500, max: 30000 }),
      jobTitle: faker.person.jobTitle(),
    }),
  }));
};

// Generate mock data for each platform
const instagramData = generateMockData('Instagram', 50);
const facebookData = generateMockData('Facebook', 50);
const youtubeData = generateMockData('YouTube', 50);
const twitterData = generateMockData('Twitter', 50);
const linkedinData = generateMockData('LinkedIn', 50);

// Combine all data
const allSocialMediaData = [
  ...instagramData,
  ...facebookData,
  ...youtubeData,
  ...twitterData,
  ...linkedinData
];

const calculateMetrics = (data) => {
  const total = data.length;
  const correct = data.filter(item => item.sentiment === (item.sentimentScore > 0 ? 'positive' : item.sentimentScore < 0 ? 'negative' : 'neutral')).length;
  const accuracy = (correct / total) * 100;

  const confusionMatrix = {
    'true_positive': 0,
    'false_positive': 0,
    'true_negative': 0,
    'false_negative': 0
  };

  data.forEach(item => {
    const predictedSentiment = item.sentimentScore > 0 ? 'positive' : item.sentimentScore < 0 ? 'negative' : 'neutral';
    if (item.sentiment === 'positive' && predictedSentiment === 'positive') {
      confusionMatrix.true_positive++;
    } else if (item.sentiment === 'negative' && predictedSentiment === 'positive') {
      confusionMatrix.false_positive++;
    } else if (item.sentiment === 'negative' && predictedSentiment === 'negative') {
      confusionMatrix.true_negative++;
    } else if (item.sentiment === 'positive' && predictedSentiment === 'negative') {
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
        ? allSocialMediaData.filter(item => item.postContent.toLowerCase().includes(searchTerm.toLowerCase()))
        : allSocialMediaData;
      
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