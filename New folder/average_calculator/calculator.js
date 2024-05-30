const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

let storedNumbers = [];
const WINDOW_SIZE = 10;

const mockData = {
  'p': [2, 3, 5, 7, 11],
  'f': [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
  'e': [2, 4, 6, 8, 10],
  'r': [5, 12, 7, 9, 15]
};

const fetchNumbers = async (type) => {
  const urlMap = {
    'p': 'http://20.244.56.144/test/primes',
    'f': 'http://20.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://20.244.56.144/test/rand',
  };

  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const response = await axios.get(urlMap[type], { timeout: 500 });
      console.log(`Fetched ${type} numbers:`, response.data.numbers);
      return response.data.numbers;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} - Error fetching ${type} numbers:`, error.message);
      if (attempts >= maxRetries) {
        console.error('Max retries reached. Using mock data.');
        return mockData[type];
      }
    }
  }
};

app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;
  const prevNumbers = [...storedNumbers];

  try {
    const numbers = await fetchNumbers(type);
    numbers.forEach(num => {
      if (!storedNumbers.includes(num)) {
        if (storedNumbers.length >= WINDOW_SIZE) {
          storedNumbers.shift();
        }
        storedNumbers.push(num);
      }
    });

    const avg = storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length;
    res.json({
      windowPrevState: prevNumbers,
      windowCurrState: storedNumbers,
      numbers,
      avg: avg.toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
