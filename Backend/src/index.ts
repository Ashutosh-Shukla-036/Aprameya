import express, { Request, Response } from 'express';
import filmRoute from "./routes/filmRoute";
import userRoute from "./routes/userRoute";
import ratingRoute from "./routes/ratingRoute";
import reviewRoute from "./routes/reviewRoute"
import WatchListRoute from "./routes/watchListRoute"
import { ConnectDB } from './db';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

ConnectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Aprameya Production API!');
});

app.use('/api/user',userRoute);
app.use('/api/films',filmRoute);
app.use('/api/rating', ratingRoute);
app.use('/api/review', reviewRoute);
app.use('/api/watchlist',WatchListRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
