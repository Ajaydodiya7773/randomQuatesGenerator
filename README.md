# Random Quotes Server

A simple Node.js server that serves random inspirational quotes from a JSON file using Express.js.

## Features

- 🎯 Get random quotes via REST API
- 📚 View all available quotes
- 📊 Get quote statistics
- 🚀 Simple and lightweight Express.js server
- 📝 JSON-based quote storage

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd random-quotes-server
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Start the Server

```bash
npm start
```

The server will start on port 3000 by default. You can set a custom port using the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### API Endpoints

#### GET /
Returns information about available endpoints.

**Example Response:**
```json
{
  "message": "Welcome to the Random Quotes Server!",
  "endpoints": {
    "GET /quote": "Get a random quote",
    "GET /quotes": "Get all quotes",
    "GET /quotes/count": "Get total number of quotes"
  }
}
```

#### GET /quote
Returns a random quote.

**Example Response:**
```json
{
  "success": true,
  "quote": {
    "text": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs"
  }
}
```

#### GET /quotes
Returns all available quotes.

**Example Response:**
```json
{
  "success": true,
  "count": 15,
  "quotes": [
    {
      "text": "The only way to do great work is to love what you do.",
      "author": "Steve Jobs"
    },
    ...
  ]
}
```

#### GET /quotes/count
Returns the total number of available quotes.

**Example Response:**
```json
{
  "success": true,
  "count": 15
}
```

## Testing the API

You can test the API using curl:

```bash
# Get a random quote
curl http://localhost:3000/quote

# Get all quotes
curl http://localhost:3000/quotes

# Get quote count
curl http://localhost:3000/quotes/count
```

Or visit the endpoints in your web browser:
- http://localhost:3000
- http://localhost:3000/quote
- http://localhost:3000/quotes
- http://localhost:3000/quotes/count

## Adding More Quotes

To add more quotes, simply edit the `quotes.json` file and add new quote objects with the following structure:

```json
{
  "text": "Your quote text here",
  "author": "Author Name"
}
```

Restart the server after making changes to the quotes file.

## Project Structure

```
random-quotes-server/
├── server.js          # Main server file
├── quotes.json        # Quote data
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## License

ISC

## Contributing

Feel free to contribute by adding more quotes or improving the server functionality!
