# 🇳🇬 Nigeria States & LGAs API

A comprehensive REST API for Nigerian States and Local Government Areas (LGAs). Built with Node.js, TypeScript, Express, and MongoDB.

## ✨ Features

- **37 States + FCT** - All Nigerian states and the Federal Capital Territory
- **774 LGAs** - Complete list of Local Government Areas
- **Region-based filtering** - Filter states by geopolitical zones
- **Fast search** - Search LGAs across all states
- **State codes** - Use standard state codes (e.g., LA for Lagos)
- **Complete relationships** - Get states with all their LGAs in one request
- **Production-ready** - Rate limiting, CORS, security headers, error handling

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nigeria-states-lga
CORS_ORIGIN=*
```

### Seed Database

Populate the database with all states and LGAs:

```bash
npm run seed
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### States Endpoints

#### Get All States

```http
GET /api/states
```

**Query Parameters:**
- `region` (optional): Filter by region (North-Central, North-East, North-West, South-East, South-South, South-West)

**Response:**
```json
{
  "success": true,
  "message": "✨ States fetched successfully",
  "data": [
    {
      "_id": "...",
      "name": "Lagos",
      "capital": "Ikeja",
      "code": "LA",
      "region": "South-West",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### Get States Grouped by Region

```http
GET /api/states/grouped
```

#### Get State by ID

```http
GET /api/states/:id
```

#### Get State by Code

```http
GET /api/states/code/:code
```

Example: `GET /api/states/code/LA`

#### Get State with LGAs

```http
GET /api/states/:id/lgas
```

**Response:**
```json
{
  "success": true,
  "message": "✨ State with LGAs fetched successfully",
  "data": {
    "_id": "...",
    "name": "Lagos",
    "capital": "Ikeja",
    "code": "LA",
    "region": "South-West",
    "lgas": [
      {
        "_id": "...",
        "name": "Ikeja",
        "stateId": "...",
        "stateName": "Lagos",
        "stateCode": "LA"
      }
    ],
    "lgaCount": 20
  }
}
```

### LGAs Endpoints

#### Get All LGAs

```http
GET /api/lgas
```

#### Get LGAs by State ID

```http
GET /api/lgas/state/:stateId
```

#### Get LGAs by State Code

```http
GET /api/lgas/state-code/:stateCode
```

Example: `GET /api/lgas/state-code/LA`

#### Search LGAs

```http
GET /api/lgas/search?query=ikeja
```

## 🏗️ Project Structure

```
nigeria-states-lga/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── stateController.ts   # State business logic
│   │   └── lgaController.ts     # LGA business logic
│   ├── data/
│   │   ├── nigeriaData.ts       # States and LGAs data
│   │   └── seed.ts              # Database seeding script
│   ├── middlewares/
│   │   └── errorHandler.ts      # Error handling middleware
│   ├── models/
│   │   ├── stateModel.ts        # State schema
│   │   └── lgaModel.ts          # LGA schema
│   ├── routes/
│   │   ├── stateRoutes.ts       # State routes
│   │   ├── lgaRoutes.ts         # LGA routes
│   │   └── index.ts             # Route aggregator
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   ├── utils/
│   │   └── logger.ts            # Logging utility
│   └── index.ts                 # App entry point
├── dist/                        # Compiled JavaScript
├── .env                         # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── vercel.json                  # Vercel deployment config
└── README.md
```

## 🌍 Deployment to Vercel

### Prerequisites

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Ensure you have a MongoDB Atlas cluster or other cloud MongoDB instance

### Steps

1. **Build the project:**
```bash
npm run build
```

2. **Update environment variables in Vercel:**
```bash
vercel env add MONGODB_URI
vercel env add NODE_ENV
vercel env add CORS_ORIGIN
```

3. **Deploy:**
```bash
vercel --prod
```

### Environment Variables for Production

Set these in your Vercel project settings:

- `MONGODB_URI`: Your MongoDB connection string (MongoDB Atlas recommended)
- `NODE_ENV`: production
- `CORS_ORIGIN`: Your frontend domain or * for all origins
- `PORT`: Not needed (Vercel handles this)

## 🔐 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Request validation
- **Error Handling** - Centralized error management

## 📊 Data Coverage

- **States**: 37 (36 states + FCT)
- **LGAs**: 774 total
- **Regions**: 6 geopolitical zones

### Regions

- North-Central
- North-East
- North-West
- South-East
- South-South
- South-West

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Deployment**: Vercel

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ for Nigeria 🇳🇬

