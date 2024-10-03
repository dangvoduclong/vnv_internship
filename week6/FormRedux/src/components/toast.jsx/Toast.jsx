import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = ({ message, type }) => {
  const notify = () => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast.warn(message);
        break;
      default:
        toast(message);
    }
  };
  return (
    <>
      {notify()}
      <ToastContainer />
    </>
  );
};

export default ToastNotification;
