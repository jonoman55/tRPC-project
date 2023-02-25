# tRPC Server & Client

This is a [tRPC](https://trpc.io/) server and client project. 

tRPC allows you to easily build & consume fully typesafe APIs without schemas or code generation.

To get started, clone the repository, then open two new terminal windows (one for the server and the other for the client).

You will need to move into both the server and client directories via the terminals.

### `cd server`
### `cd client`

Finally, install the dependencies for both the server and client:

### `npm install`

## Server

The server is a node/express server with tRPC integration. 

The server has very simple REST endpoints and a WebSocket connection.

### Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The server will reload if you make edits.\
You will also see any errors in the console.

## Client

This is a React app created with [vite](https://vitejs.dev/). 

The tRPC server is imported for seamless integration and type safety.

Another added benefit of using tRPC is having IntelliSense in VSCode when using the server in your client.

### Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The server will reload if you make edits.\
You will also see any errors in the console.

## License

MIT