import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Connected to server');
  
  socket.on('hello', (res) => {
    console.log(res.message); // Assuming you're using toast for notifications
    toast.success(res.message);
  });
});

export default socket;
