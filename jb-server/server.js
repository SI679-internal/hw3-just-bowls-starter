import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { productRouter } from './routes/productRoutes.js';
import { customerRouter } from './routes/customerRoutes.js';

dotenv.config();

const app = express();

const port = 6790;

app.use(express.json());
app.use(cors());
app.use(express.static('static'));

app.use('/products', productRouter);
app.use('/customers', customerRouter);

app.listen(port);