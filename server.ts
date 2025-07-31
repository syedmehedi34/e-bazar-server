import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './database/dbConnection';

dotenv.config();

const app = express();
app.use(cors());

dbConnection();

app.get('/', (req, res) => {
  res.send("hello bazaar");
});

app.listen(5000, () => {
  console.log('server is running on port 5000');
});
