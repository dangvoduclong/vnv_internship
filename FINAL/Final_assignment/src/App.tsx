import React from "react";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/auth-context";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
