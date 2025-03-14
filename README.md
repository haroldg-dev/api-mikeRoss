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

---

## Some Endpoints

### Messages

#### 1. **Get Messages by Cursor**

- **URL**: `/messages/cursor/:limit`
- **Method**: `GET`
- **Query Parameters**:
  - `cursor` (optional): Cursor for pagination.
  - `chatId` (optional): ID of the chat to filter messages.
- **Response**:
  ```json
  [
    {
      "content": {
        "type": "text",
        "text": "Hello, world!"
      },
      "_id": "67d37ce6afaf634fa2d9a93c",
      "user_id": "67d36fc2525f6cd4fcb21a39",
      "chat_id": "67d3761624b5cd1d25af4521",
      "status": "delivered",
      "direction": "inbound",
      "created_at": "2025-03-14T00:48:38.231Z"
    }
  ]
  ```

#### 2. **Create a Message**

- **URL**: `/messages`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "user_id": "67d36fc2525f6cd4fcb21a39",
    "chat_id": "67d3761624b5cd1d25af4521",
    "status": "delivered",
    "direction": "outbound",
    "content": {
      "type": "text",
      "text": "Hello, world!"
    }
  }
  ```
- **Response**:
  ```json
  {
    "content": {
      "type": "text",
      "text": "Hello, world!"
    },
    "_id": "67d37ce6afaf634fa2d9a93c",
    "user_id": "67d36fc2525f6cd4fcb21a39",
    "chat_id": "67d3761624b5cd1d25af4521",
    "status": "delivered",
    "direction": "outbound",
    "created_at": "2025-03-14T00:48:38.231Z"
  }
  ```

---

### Chats

#### 1. **Get All Chats**

- **URL**: `/chats`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "_id": "67d3761624b5cd1d25af4521",
      "title": "General Chat",
      "total_messages": 42,
      "user": {
        "id": "67d36fc2525f6cd4fcb21a39",
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "active_bot": true,
      "created_at": "2025-03-13T00:00:00.000Z",
      "updated_at": "2025-03-14T00:00:00.000Z"
    }
  ]
  ```

---

## Usage

### Authentication

- Use the `useAuth` hook to check if a user is authenticated.
- Example:
  ```typescript
  const isAuthenticated = useAuth();
  if (!isAuthenticated) {
    console.log('User is not authenticated');
  }
  ```

### Fetching Messages

- Use the `useMessages` hook to fetch messages for a specific chat.
- Example:
  ```typescript
  const { messages, loading, error } = useMessages(chatId);
  ```

### Fetching Chats

- Use the `useChats` hook to fetch all available chats.
- Example:
  ```typescript
  const { chats, loading, error } = useChats();
  ```

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.

---
