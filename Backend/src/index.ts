import express, { Request, Response } from 'express';
import fileRoute from "./routes/filmRoute"
import { ConnectDB } from './db';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

ConnectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Aprameya Production API!');
});

app.use('/films',fileRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
