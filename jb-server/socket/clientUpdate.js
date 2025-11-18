import { Server } from 'socket.io';

let io = null;
const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // for development only!
      methods: ["GET", "POST"]
    }
  });
  io.on('connection', (socket) => {
    console.log('A client  connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });
}

const updateProduct = (productId, updatedFields) => {
  io.emit('updateProduct', productId, updatedFields);
}

export const socket = {
  initSocket,
  updateProduct
}