# SQLite Node.js Server

Auto-generated Node.js server with SQLite database.

## Features

- Express.js REST API
- SQLite database with Sequelize ORM
- CRUD operations
- Docker support

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
# Using npm
npm install

# Using pnpm
pnpm install
pnpm rebuild sqlite3
```

2. Set up environment variables:
Copy `.env` file and update if needed.

3. Start the server:
```bash
npm start
# or
pnpm start
```

### Docker Setup

From this directory:

```bash
mkdir -p data
# Keep an existing database.sqlite if you have one:
# cp -n database.sqlite data/database.sqlite
docker compose up -d --build
```

The container name is `codereader-server`. The API listens on port **3011**. Saved QR codes are stored in `./data/database.sqlite`.

Every `/api/QRCode` route requires `Authorization: Bearer <Firebase ID token>`. The signed-in user's id comes from that token.

## API Endpoints

Your custom model routes will be available at `/api/{model_name}/`

### Standard CRUD Operations
- `POST /api/{model}/create` - Create new record
- `GET /api/{model}/read` - Read all records (with pagination)
- `GET /api/{model}/read/:id` - Read specific record by ID
- `PUT /api/{model}/update/:id` - Update record by ID
- `DELETE /api/{model}/delete/:id` - Delete record by ID

## Environment Variables

- `PORT` - Server port (default: 3011)
- `DATABASE_PATH` - SQLite file (default: `./data/database.sqlite`)
- `FIREBASE_PROJECT_ID` - Firebase project used to verify ID tokens (default: `general-2ed6c`)

## Database

The SQLite database file is created automatically. Records are readable only by the user who saved them.

## Troubleshooting

### SQLite3 binding errors with pnpm

If you encounter binding errors after installation:
```bash
pnpm rebuild sqlite3
```
