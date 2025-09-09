import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './database/dbConnection';
import { createUser } from './controllar/userController/createUser';

dotenv.config();

const app = express();
app.use(cors());

dbConnection();

//POST
app.post('/create/user', createUser)


//GET

//DELETE

//PATCH

//PUT

app.listen(5000, () => {
  console.log('server is running on port 5000');
});
