import { Route, Routes } from "react-router";
import NotFound from "../pages/notfound/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import Layout from "../layouts";
import { HomePage } from "../pages";
import UserTest from "../pages/user/User";
import FormUser from "../pages/form/FormUser";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user/:id" element={<UserTest />} />
        <Route path="form" element={<FormUser />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
