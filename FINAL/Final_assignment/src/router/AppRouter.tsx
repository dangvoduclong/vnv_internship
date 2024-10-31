import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Authen/LoginPage";
import ErrorPage from "../components/common/ErrorPage";
import Layouts from "../layouts";
import AdminManagement from "../pages/AdminManagement";
import DoulaManagement from "../pages/DoulaManagement";
import ClientManagement from "../pages/ClientManagement";
import ArticlePage from "../pages/ArticlePage";
import PDSessionPage from "../pages/PDSession";
import CategoryPage from "../pages/CategoryPage";
import VoucherPage from "../pages/VoucherPage";
import HelpPage from "../pages/HelpPage";
import SearchSettingPage from "../pages/SearchSettingPage";
import PrivateRoute from "./PrivateRoute";
import { ROUTES } from "../constants/routes";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route element={<Layouts />}>
        <Route path={ROUTES.ACCOUNT}>
          <Route
            path={ROUTES.ADMIN}
            element={
              <PrivateRoute>
                <AdminManagement />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.DOULA}
            element={
              <PrivateRoute>
                <DoulaManagement />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.CLIENT}
            element={
              <PrivateRoute>
                <ClientManagement />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path={ROUTES.ARTICLE}
          element={
            <PrivateRoute>
              <ArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.PD_SESSION}
          element={
            <PrivateRoute>
              <PDSessionPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.CATEGORIES}
          element={
            <PrivateRoute>
              <CategoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.VOUCHER}
          element={
            <PrivateRoute>
              <VoucherPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.HELP_DOCS}
          element={
            <PrivateRoute>
              <HelpPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.SEARCH_SETTINGS}
          element={
            <PrivateRoute>
              <SearchSettingPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
