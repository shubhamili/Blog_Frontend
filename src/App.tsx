import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "@/store/authSlice";
import { fetchCurrentUser } from "@/api/auth";
import AppRoutes from "./routes/AppRoute";
import Navbar from "./components/Navbar";
import { RootState } from "./store"; // ✅ or wherever you define your root reducer

function App() {
  const dispatch = useDispatch();
  const authLoaded = useSelector((state: RootState) => state.auth.authLoaded); // ✅

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetchCurrentUser();
        dispatch(setUser({ user: res.user }));
      } catch (err) {
        dispatch(logout());
      }
    };

    loadUser();
  }, [dispatch]);

  if (!authLoaded) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    ); // or a nice loading spinner
  }

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
