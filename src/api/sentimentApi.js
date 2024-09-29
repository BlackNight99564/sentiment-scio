const mockData = [
  { text: "I love this new product!", sentiment: "positive" },
  { text: "The customer service was terrible.", sentiment: "negative" },
  { text: "It's okay, nothing special.", sentiment: "neutral" },
  { text: "This app has changed my life!", sentiment: "positive" },
  { text: "I'm disappointed with the quality.", sentiment: "negative" },
  { text: "It works as expected.", sentiment: "neutral" },
  { text: "Absolutely amazing experience!", sentiment: "positive" },
  { text: "Worst purchase ever.", sentiment: "negative" },
  { text: "I have mixed feelings about this.", sentiment: "neutral" },
  { text: "Highly recommended!", sentiment: "positive" },
];

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