import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import ContactPage from "../pages/home/components/ContactPage";
import ErrorPage from "../pages/home/components/ErrorPage";
import LoginPage from "../pages/home/components/LoginPage";
import SignUpPage from "../pages/home/components/SignUpPage";
import { CustomFormProvider } from "../components/form/FormContext";
import { AuthProvider } from "../context/AuthContext";
import PublicRoute from "./PublicRoute";
const AppRouter = () => {
  return (
    <CustomFormProvider>
      <AuthProvider>
        <Routes>
          <Route index element={<HomePage />} />
          {/** public routes */}
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="contact"
            element={
              <PublicRoute>
                <ContactPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </CustomFormProvider>
  );
};

export default AppRouter;
