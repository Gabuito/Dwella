import Express, { type Request, type Response, type Application} from 'express';
import subdomain from 'express-subdomain';
import { rateLimit } from 'express-rate-limit'
import {api,utils} from './global.routes.ts';

const app: Application = Express();

// Add JSON parsing middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

//app.set('trust proxy', true); 
app.set('subdomain offset', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
  standardHeaders: true,
  legacyHeaders: false, 
  statusCode: 429, 
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

// Setup API routes with subdomain
app.use(subdomain('api', api));
//app.use(subdomain('docs', docs));
//app.use(subdomain('media', media));
app.use(subdomain('status', utils));


app.get('/', (_: Request, res: Response) => {
  res.send('Hello from the main domain!');
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});