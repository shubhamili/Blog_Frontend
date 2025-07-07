import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/api/auth";
import Navbar from "./components/Navbar";
import AppRoutes from "@/routes/AppRoute";
import { setUser } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetchCurrentUser(); // uses cookie
        dispatch(setUser(res));
      } catch (err) {
        console.log("User not authenticated");
      }
    };

    loadUser();
  }, []);

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
