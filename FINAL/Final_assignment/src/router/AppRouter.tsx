import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/publicPages/LoginPage";
import ErrorPage from "../pages/components/ErrorPage";
import Layouts from "../layouts";
import AdminManagement from "../pages/privatePages/AdminManagement";
import DoulaManagement from "../pages/privatePages/DoulaManagement";
import ClientManagement from "../pages/privatePages/ClientManagement";
import ArticlePage from "../pages/privatePages/ArticlePage";
import PDSessionPage from "../pages/privatePages/PDSessionPage";
import CategoryPage from "../pages/privatePages/CategoryPage";
import VoucherPage from "../pages/privatePages/VoucherPage";
import HelpPage from "../pages/privatePages/HelpPage";
import SearchSettingPage from "../pages/privatePages/SearchSettingPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route element={<Layouts />}>
        <Route path="account/admins" element={<AdminManagement />} />
        <Route path="account/doulas" element={<DoulaManagement />} />
        <Route path="account/client" element={<ClientManagement />} />
        <Route path="article" element={<ArticlePage />} />
        <Route path="pd-sessions" element={<PDSessionPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="voucher" element={<VoucherPage />} />
        <Route path="help-documents" element={<HelpPage />} />
        <Route path="search-settings" element={<SearchSettingPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
