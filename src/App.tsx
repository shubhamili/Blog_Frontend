import { useEffect } from 'react';
import AppRoutes from './routes/RoutingSetup'
import socket from './socket';
import { toast } from 'react-toastify';

const App = () => {



  useEffect(() => {
    socket.on("new-notification", (data) => {
      console.log("Realtime notification:", data);

      // Show toast (React Hot Toast or ShadCN toast)
      // example:
      toast.success(data.message);

      // Update notification badge
      // dispatch(addNotification(data))1
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