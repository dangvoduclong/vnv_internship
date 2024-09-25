import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import ContactPage from "../pages/home/components/ContactPage";
import ErrorPage from "../pages/home/components/ErrorPage";
import LoginPage from "../pages/home/components/LoginPage";
import SignUpPage from "../pages/home/components/SignUpPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
