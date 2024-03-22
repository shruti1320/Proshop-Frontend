import { useEffect } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const SOCKET_SERVER_URL = 'http://localhost:3001';
const socket = io(SOCKET_SERVER_URL);

const ProductSocketHandler = () => {
  useEffect(() => {
    
    socket.on('addProduct', (data) => {
      
      console.log('New product added:', data);
      toast.success('New product added');
    });

    socket.on('updateProduct', (data) => {
     
      console.log('Product updated:', data);
      toast.success('Product updated');
    });

    
    socket.on('deleteProduct', (data) => {
      // Handle the event, e.g., update UI or show a notification
      console.log('Product deleted:', data);
      toast.success('Product deleted');
    });

    // Event listener for 'getProducts' event
    socket.on('getProducts', (data) => {
      // Handle the event, e.g., update UI or show a notification
      console.log('Retrieved products:', data);
      toast.success('Retrieved products');
    });

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      socket.off('addProduct');
      socket.off('updateProduct');
      socket.off('deleteProduct');
      socket.off('getProducts');
    };
  }, [socket]);

  // No need to render anything for this component, it just handles socket events
  return null;
};

export default ProductSocketHandler;
