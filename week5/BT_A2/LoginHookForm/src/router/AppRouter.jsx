import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Home = lazy(() => import("../pages/Home"));
const SignUp = lazy(() => import("../pages/SignUp"));
const DashBoard = lazy(() => import("../pages/DashBoard"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const Layout = lazy(() => import("../layouts/Layout"));
const LoginPage = lazy(() => import("../pages/Login"));
const PerInfo = lazy(() => import("../pages/PerInfo"));
const AddPhoneNum = lazy(() => import("../pages/AddPhoneNum"));
const Loading = lazy(() => import("../pages/Loading"));

const AppRouter = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route element={<Layout />}>
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="personalInformation"
              element={
                <PrivateRoute>
                  <PerInfo />
                </PrivateRoute>
              }
            />
            <Route
              path="addphone"
              element={
                <PrivateRoute>
                  <AddPhoneNum />
                </PrivateRoute>
              }
            />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRouter;
