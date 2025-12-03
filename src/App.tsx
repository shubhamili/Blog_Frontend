import { useEffect } from 'react';
import AppRoutes from './routes/RoutingSetup'
import socket from './socket';
import { toast } from 'react-toastify';

const App = () => {



  useEffect(() => {
    socket.on("new-notification", (data) => {
      console.log("Realtime notification is here🔥:", data);


      toast.success(data.message);

    });

    return () => {
      socket.off("new-notification");
    };
  }, []);







  return (
    <>

      <AppRoutes />
    </>
  )
}

export default App