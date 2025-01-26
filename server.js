import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Use CORS to allow cross-origin requests
server.use(cors());

// Use the default middleware for JSON Server
server.use(middlewares);

// Custom middleware to log every request
server.use((req, res, next) => {
  console.log(`${req.method} request made to: ${req.originalUrl}`);
  next(); // Pass the request to the next middleware (router)
});

// Use the router that reads from 'db.json'
server.use(router);

// Make sure to listen on all network interfaces (0.0.0.0)
server.listen(5000, '0.0.0.0', () => {
  console.log('JSON Server is running on port 5000');
});
