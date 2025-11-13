import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';

import { productRouter } from './routes/productRoutes.js';
import { customerRouter } from './routes/customerRoutes.js';
import { productService } from './services/productService.js';
import { socket } from './socket/clientUpdate.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
socket.initSocket(server);

const port = 6790;

app.use(express.json());
app.use(cors());
app.use(express.static('static'));

app.use('/products', productRouter);
app.use('/customers', customerRouter);

productService.watchProducts();

server.listen(port);