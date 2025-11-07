import express from 'express';
import { orderControllers } from '../controllers/orderControllers.js';

const customerRouter = express.Router();

customerRouter.post('/:id/orders', orderControllers.addOrder);

export {customerRouter}