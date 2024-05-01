import React from "react";
import AppRouter from "./router/AppRouter";
import AuthProvider from "./Context/AuthProvider";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <div className="dark:bg-gray-dark-main dark:text-white min-h-screen">
      <AuthProvider><AppRouter />
      <ToastContainer /></AuthProvider>
      
    </div>
  );
};

export default App;
