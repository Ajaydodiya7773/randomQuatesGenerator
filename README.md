# 🎯 Random Quotes Generator

A beautiful, modern web application that serves inspiring quotes with a stunning frontend interface and robust REST API.

![Random Quotes Generator](https://img.shields.io/badge/Status-Live-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-Express-blue)
![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS-yellow)
![Responsive](https://img.shields.io/badge/Design-Responsive-purple)

## ✨ Features

### 🎨 Frontend
- **Beautiful Modern UI** with gradient backgrounds and glass-morphism effects
- **Responsive Design** that works perfectly on desktop and mobile
- **Smooth Animations** for all user interactions
- **Copy to Clipboard** functionality with visual feedback
- **Social Share Options** (Twitter, Facebook, WhatsApp)
- **Loading States** and **Toast Notifications**
- **Statistics Tracking** (total quotes, quotes viewed)
- **Keyboard Shortcuts** for power users
- **Offline Detection** and error handling
- **Easter Eggs** for fun user interactions

### 🚀 Backend API
- **RESTful API** built with Express.js
- **Random Quote Endpoint** - Get a random inspirational quote
- **All Quotes Endpoint** - Retrieve all quotes in the database
- **Quote Count Endpoint** - Get total number of available quotes
- **Static File Serving** for the frontend
- **Error Handling** and **CORS Support**

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3 (with animations), Vanilla JavaScript
- **Data**: JSON file-based storage
- **Fonts**: Google Fonts (Poppins)
- **Icons**: Font Awesome
- **Design**: Modern CSS with gradients, backdrop-filter, and responsive grid

## 🚦 Getting Started

### Prerequisites
- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ajaydodiya7773/randomQuatesGenerator.git
   cd randomQuatesGenerator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Main Interface: `http://localhost:3000`
   - API Documentation: `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|-----------|
| GET | `/` | Welcome message with API info | JSON object with endpoints |
| GET | `/quote` | Get a random quote | `{"success": true, "quote": {...}}` |
| GET | `/quotes` | Get all quotes | `{"success": true, "quotes": [...]}` |
| GET | `/quotes/count` | Get total quote count | `{"success": true, "count": number}` |

### Example API Response

```json
{
  "success": true,
  "quote": {
    "text": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs"
  }
}
```

## 🎮 User Guide

### Frontend Features
1. **Get New Quote**: Click the "Get New Quote" button or press `Space`/`Enter`
2. **Copy Quote**: Click "Copy Quote" button or press `Ctrl+C`
3. **Share Quote**: Click "Share" button or press `Ctrl+S`
4. **Statistics**: View total quotes available and quotes you've viewed
5. **Keyboard Shortcuts**: Use keyboard for faster navigation
6. **Easter Egg**: Click the quote card 5 times for a surprise! 🎉

### Mobile Experience
- Fully responsive design
- Touch-friendly buttons
- Optimized animations for mobile devices
- Toast notifications adapted for smaller screens

## 📁 Project Structure

```
random-quotes-server/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styling with animations
│   └── script.js          # Frontend JavaScript
├── quotes.json            # Quote database
├── server.js              # Express.js server
├── package.json           # Node.js dependencies
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## 🎨 Design Features

- **Color Scheme**: Purple-blue gradient background
- **Typography**: Poppins font family for modern look
- **Animations**: 
  - Fade-in effects on page load
  - Quote transition animations
  - Button hover effects
  - Loading spinners
- **Responsive Breakpoints**: 768px and 480px for mobile optimization

## 🚀 Deployment Options

### Local Development
```bash
npm start
```

### Production Deployment
1. **Heroku**
2. **Vercel**
3. **Netlify** (for frontend)
4. **Railway**
5. **DigitalOcean**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Adding More Quotes

To add more quotes, edit the `quotes.json` file:

```json
[
  {
    "text": "Your new inspiring quote here.",
    "author": "Quote Author"
  }
]
```

## 🐛 Troubleshooting

### Server Won't Start
- Check if port 3000 is available
- Ensure Node.js is installed
- Run `npm install` to install dependencies

### Frontend Not Loading
- Verify server is running on `http://localhost:3000`
- Check browser console for JavaScript errors
- Ensure `public` folder exists with all files

### API Errors
- Check `quotes.json` file format
- Verify Express.js is handling routes correctly
- Check server console for error messages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ajay Dodiya**
- GitHub: [@Ajaydodiya7773](https://github.com/Ajaydodiya7773)
- Project Link: [Random Quotes Generator](https://github.com/Ajaydodiya7773/randomQuatesGenerator)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

*Built with ❤️ using Node.js and modern web technologies*

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
