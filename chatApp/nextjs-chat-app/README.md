# Next.js Chat Application

This is a simple chat application built with Next.js and React, utilizing WebSockets for real-time communication. The application allows users to send and receive messages in real-time.

## Project Structure

```
nextjs-chat-app
├── src
│   ├── pages
│   │   ├── index.tsx        # Main entry point for the chat application
│   │   └── api
│   │       └── websocket.ts  # WebSocket server setup
│   ├── components
│   │   └── Chat.tsx         # Chat interface component
│   └── types
│       └── index.ts         # TypeScript types and interfaces
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd nextjs-chat-app
   ```

2. Install the dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

### Running the Application

To start the development server, run:

```
npm run dev
```

or

```
yarn dev
```

The application will be available at `http://localhost:3000`.

### WebSocket Server

The WebSocket server is set up in the `src/pages/api/websocket.ts` file. It handles incoming connections and messages, allowing for real-time chat functionality.

### Storing Chats

For storing chat messages, this application uses Vercel's "Blob" storage option. This is suitable for handling large amounts of data, such as chat messages. "Edge Config" is not recommended for this purpose as it is better suited for configuration data.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.

## License

This project is licensed under the MIT License.