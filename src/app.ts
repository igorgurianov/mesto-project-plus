import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // @ts-ignore
  req.user = { _id: '65e1c1627a7a297fc0ebeea0' };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', cardRouter);
app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`Mesto API is listening! on port - ${PORT}`);
});
