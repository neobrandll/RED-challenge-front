import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { RootState } from "./store/rootReducer";

function App() {
  const isAuth = useSelector((state: RootState) => state.user.user);

  const getRoutes = useCallback(() => {
    if (!isAuth) return <AuthRoutes />;
    return <AppRoutes />;
  }, [isAuth]);

  return (
    <div className="App">
      <Loader />
      <main>
        <Router>{getRoutes()}</Router>
      </main>
    </div>
  );
}

export default App;
