import express from 'express';
import dotenv from 'dotenv';

import { productRouter } from './routes/productRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { customerRouter } from './routes/customerRoutes.js';

dotenv.config();

const app = express();
const port = 6790;

app.use(express.json());
app.use(errorHandler);

app.use('/products', productRouter);
app.use('/customers', customerRouter)

app.listen(port);