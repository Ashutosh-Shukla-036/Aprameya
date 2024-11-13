import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Aprameya Production API!');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
