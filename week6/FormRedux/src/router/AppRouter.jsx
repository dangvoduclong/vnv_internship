import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import ContactPage from "../pages/home/components/ContactPage";
import ErrorPage from "../pages/home/components/ErrorPage";
import LoginPage from "../pages/home/components/LoginPage";
import Information from "../pages/protectedPages/Information";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/protectedPages/Dashboard";
import Layout from "../layouts/Layout";
import Settings from "../pages/protectedPages/Settings";
import SignUpPage from "../pages/home/components/SignUpPage";
import GetPages from "../pages/protectedPages/GetPages";
import PatchPages from "../pages/protectedPages/PatchPages";
import PostPages from "../pages/protectedPages/PostPages";
import DeletePages from "../pages/protectedPages/DeletePages";
import PutPages from "../pages/protectedPages/PutPages";
import LayoutApi from "../layouts/LayoutApi";

const AppRouter = () => {
  return (
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
      <Route
        path=""
        element={
          <PrivateRoute>
            <LayoutApi />{" "}
          </PrivateRoute>
        }
      >
        <Route path="get" element={<GetPages />} />
        <Route path="post" element={<PostPages />} />
        <Route path="put" element={<PutPages />} />
        <Route path="patch" element={<PatchPages />} />
        <Route path="delete" element={<DeletePages />} />
      </Route>
      <Route path="error" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
