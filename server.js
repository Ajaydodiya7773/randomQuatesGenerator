const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (optional - for future frontend)
app.use(express.static('public'));

// Load quotes from JSON file
let quotes = [];
try {
  const quotesData = fs.readFileSync(path.join(__dirname, 'quotes.json'), 'utf8');
  quotes = JSON.parse(quotesData);
  console.log(`Loaded ${quotes.length} quotes`);
} catch (error) {
  console.error('Error loading quotes:', error);
  process.exit(1);
}

// Helper function to get random quote
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Random Quotes Server!',
    endpoints: {
      'GET /quote': 'Get a random quote',
      'GET /quotes': 'Get all quotes',
      'GET /quotes/count': 'Get total number of quotes'
    }
  });
});

// Get a random quote
app.get('/quote', (req, res) => {
  try {
    const randomQuote = getRandomQuote();
    res.json({
      success: true,
      quote: randomQuote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get random quote'
    });
  }
});

// Get all quotes
app.get('/quotes', (req, res) => {
  try {
    res.json({
      success: true,
      count: quotes.length,
      quotes: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get quotes'
    });
  }
});

// Get quotes count
app.get('/quotes/count', (req, res) => {
  res.json({
    success: true,
    count: quotes.length
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Random Quotes Server is running on port ${PORT}`);
  console.log(`Access the server at: http://localhost:${PORT}`);
  console.log(`Get a random quote at: http://localhost:${PORT}/quote`);
});
