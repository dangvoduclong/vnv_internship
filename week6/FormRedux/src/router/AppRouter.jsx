import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import ContactPage from "../pages/home/components/ContactPage";
import ErrorPage from "../pages/home/components/ErrorPage";
import LoginPage from "../pages/home/components/LoginPage";
import SignUpPage from "../pages/home/components/SignUpPage";
import Information from "../pages/protectedPages/Information";
import { AuthProvider } from "../context/AuthContext";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/protectedPages/Dashboard";
import Layout from "../layouts/Layout";
import Settings from "../pages/protectedPages/Settings";
import { CustomFormProvider } from "../context/FormContext";

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

          {/** private routes */}
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="information" element={<Information />} />
            <Route path="setting" element={<Settings />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="error" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </CustomFormProvider>
  );
};

export default AppRouter;
