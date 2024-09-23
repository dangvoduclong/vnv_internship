import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PerInfor from "./pages/PerInfor";
import Loading from "./pages/Loading";

const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Layout = lazy(() => import("./layouts/Layout"));
const LoginPage = lazy(() => import("./pages/Login"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="personalInformation" element={<PerInfor />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
