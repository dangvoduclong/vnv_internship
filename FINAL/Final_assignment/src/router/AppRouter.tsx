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
import { ROUTES } from "../constants/routes";
import VoucherDetailPage from "../pages/VoucherPage/VoucherDetailPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index path="/login" element={<LoginPage />} />
      <Route element={<Layouts />}>
        <Route path={ROUTES.ACCOUNT}>
          <Route path={ROUTES.ADMIN} element={<AdminManagement />} />
          <Route path={ROUTES.DOULA} element={<DoulaManagement />} />
          <Route path={ROUTES.CLIENT} element={<ClientManagement />} />
        </Route>
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
