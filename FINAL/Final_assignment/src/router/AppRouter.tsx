import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const LoginPage = React.lazy(() => import("../pages/Authen/LoginPage"));
const ErrorPage = React.lazy(() => import("../components/common/ErrorPage"));
const Layouts = React.lazy(() => import("../layouts"));
import AdminManagement from "../pages/AdminManagement";
import DoulaManagement from "../pages/DoulaManagement";
import ClientManagement from "../pages/ClientManagement";
import ArticlePage from "../pages/ArticlePage";
import PDSessionPage from "../pages/PDSession";
import CategoryPage from "../pages/CategoryPage";
import VoucherPage from "../pages/VoucherPage";
import HelpPage from "../pages/HelpPage";
import SearchSettingPage from "../pages/SearchSettingPage";
import { ROUTES } from "../constants/routes";
import VoucherDetailPage from "../pages/VoucherPage/VoucherDetailPage";
import DoulaDetailPage from "../pages/DoulaManagement/DoulaDetailPage";
import PrivateRoute from "./PrivateRoute";
import DoulaPackagePage from "../pages/DoulaManagement/DoulaPackagePage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route index path="/login" element={<LoginPage />} />
      <Route
        element={
          <PrivateRoute>
            <Layouts />
          </PrivateRoute>
        }
      >
        <Route path={ROUTES.ACCOUNT}>
          <Route path={ROUTES.ADMIN} element={<AdminManagement />} />
          <Route path={ROUTES.DOULA} element={<DoulaManagement />} />
          <Route path={ROUTES.DOULA + "/:id"} element={<DoulaDetailPage />} />
          <Route path={ROUTES.CLIENT} element={<ClientManagement />} />
        </Route>
        <Route path={ROUTES.PACKAGE + "/:id"} element={<DoulaPackagePage />} />
        <Route path={ROUTES.ARTICLE} element={<ArticlePage />} />
        <Route path={ROUTES.PD_SESSION} element={<PDSessionPage />} />
        <Route path={ROUTES.CATEGORIES} element={<CategoryPage />} />
        <Route path={ROUTES.VOUCHER} element={<VoucherPage />} />
        <Route path={ROUTES.VOUCHER + "/:id"} element={<VoucherDetailPage />} />
        <Route path={ROUTES.HELP_DOCS} element={<HelpPage />} />
        <Route path={ROUTES.SEARCH_SETTINGS} element={<SearchSettingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
