# MIKE ROSS API

- DOCS -> https://github.com/haroldg-dev/api-mikeRoss

The `api-mikeRoss` is a backend service built with [NestJS](https://nestjs.com/) and MongoDB. It provides chat and messaging functionalities, including support for GPT-based services.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Modules](#modules)
- [Endpoints](#endpoints)
  - [Messages](#messages)
  - [Chats](#chats)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Chat management with MongoDB.
- Messaging system with support for cursor-based pagination.
- Integration with GPT services for AI-powered features.
- Authentication and authorization support.
- Modular architecture for scalability.

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- pnpm
- MongoDB (running locally or in the cloud)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/haroldg-dev/api-mikeRoss.git
   cd api-mikeRoss
   ```

2. Install dependencies:

```
npm install
```

3. Set up enviroment variables

```
PORT=4040

TOKEN_TIMEOUT=*******
TOKEN_KEYWORD=*******

MONGO_USER=*******
MONGO_PASSWORD=*******
MONGO_HOST=*******
MONGO_DBNAME=*******
MONGO_OPTIONS=*******

GPT_TOKEN=*******
GPT_ID_MASTER=*******

```

4. Start development server:

```
npm run start:dev
```

5. Access the API at http://localhost:4040

## Modules

The application is structured into the following modules:

1. Messages Module
   Handles message creation, retrieval, and cursor-based pagination.
   Schema: MessageSchema.
2. Chats Module
   Manages chat rooms and their metadata.
   Schema: ChatSchema.
3. GPT Module
   Integrates GPT-based services for AI-powered features.
4. Authentication Module
   Provides guards and utilities for user authentication and authorization.
