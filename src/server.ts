import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user';
import productRoutes from './handlers/product';

const app: express.Application = express();
const port: number = 3333;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

// Routes
userRoutes(app);
productRoutes(app);

app.listen(port, function () {
  console.log(`starting app on port: ${port}`);
});
