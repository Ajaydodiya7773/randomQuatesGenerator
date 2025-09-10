# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a simple Node.js REST API server built with Express.js that serves random inspirational quotes from a JSON data file. The application follows a minimal architecture pattern with a single server file and JSON-based data storage.

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Start the server (production)
npm start

# Start the server (development - same as npm start)
npm run dev

# Start with custom port
PORT=8080 npm start
```

### Testing the API
```bash
# Test random quote endpoint
curl http://localhost:3000/quote

# Test all quotes endpoint
curl http://localhost:3000/quotes

# Test quote count endpoint
curl http://localhost:3000/quotes/count

# Test root endpoint for API info
curl http://localhost:3000
```

### Common Development Tasks
```bash
# Check if server is running
netstat -an | findstr :3000

# View server logs (if running in background)
# Server outputs to console by default

# Validate quotes.json format
node -e "console.log('Valid JSON:', JSON.parse(require('fs').readFileSync('quotes.json', 'utf8')).length + ' quotes')"
```

## Code Architecture

### Core Components

- **server.js**: Main application entry point containing all Express.js routes and middleware
- **quotes.json**: Data storage file containing quote objects with `text` and `author` properties
- **package.json**: Project configuration with minimal dependencies (only Express.js)

### Application Structure

The server follows a simple synchronous architecture:

1. **Initialization**: Loads quotes from `quotes.json` into memory at startup
2. **Route Handlers**: Four main endpoints serving different quote operations
3. **Error Handling**: Global error middleware and 404 handler
4. **Static Serving**: Configured for potential frontend files in `public/` directory (not currently used)

### Key Patterns

- **Synchronous Data Loading**: Quotes are loaded once at startup using `fs.readFileSync()`
- **In-Memory Storage**: All quotes stored in a JavaScript array for fast access
- **JSON API Responses**: All endpoints return structured JSON with `success` boolean and data
- **Random Selection**: Uses `Math.random()` for quote selection
- **Error-First Design**: Comprehensive error handling with try-catch blocks

### API Response Format

All endpoints follow a consistent response structure:
```javascript
{
  "success": boolean,
  "quote": object,     // for single quote
  "quotes": array,     // for multiple quotes  
  "count": number,     // for count operations
  "error": string      // for error cases
}
```

### Data Model

Quote objects follow this structure:
```javascript
{
  "text": "Quote content as string",
  "author": "Author name as string"
}
```

## Development Notes

### Adding New Quotes
- Edit `quotes.json` directly
- Restart server to reload data (no hot-reloading implemented)
- Ensure proper JSON format with `text` and `author` fields

### Port Configuration
- Default port: 3000
- Override with `PORT` environment variable
- Server binds to all interfaces (0.0.0.0)

### Error Scenarios
- Server exits with code 1 if `quotes.json` cannot be loaded
- Individual endpoint failures return 500 status with error messages
- Missing endpoints return 404 with structured error response

### Potential Extensions
- The server is configured to serve static files from a `public/` directory
- Express middleware is set up for JSON parsing
- Error handling middleware is in place for additional route complexity
