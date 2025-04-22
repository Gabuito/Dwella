import Express, { type Request, type Response, type Application} from 'express';
import subdomain from 'express-subdomain';
import { rateLimit } from 'express-rate-limit';
import {api,utils} from './global.routes.ts';

// Instance of the ExpressJS application
const app: Application = Express();

// CORS and headers configuration
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
//app.set('trust proxy', true); 

// Subdomain offset configuration
app.set('subdomain offset', 1);

// Request limit configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false, 
  statusCode: 429, 
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

// Subdomain routes configuration
app.use(subdomain('api', api));
//app.use(subdomain('docs', docs));
//app.use(subdomain('media', media));
app.use(subdomain('status', utils));

// Default root route configuration
app.get('/', (_: Request, res: Response) => {
  res.send('Hello from the main domain!');
});

// Starting the ExpressJS server
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});