import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userData } from "../../assets/data";
const UserTest = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const user = userData.find((user) => user.id === parseInt(id));

  if (!user) {
    return <div>User not found!</div>;
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center max-w-xs p-6 shadow-md rounded-xl bg-red-100 dark:text-gray-800">
        <img
          src="https://avatarfiles.alphacoders.com/325/thumb-1920-325934.png"
          alt="Leroy Jenkins"
          className="w-32 h-32 rounded-full dark:bg-gray-500"
        />
        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-xs dark:text-gray-600">{user.job}</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="#"
            aria-label="GitHub"
            className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
          >
            <svg viewBox="0 0 496 512" className="w-4 h-4 fill-current">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
            </svg>
          </a>
          <a
            href="#"
            aria-label="Dribbble"
            className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
          >
            <svg viewBox="0 0 512 512" className="w-4 h-4 fill-current">
              <path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-97.795 142.191z"></path>
            </svg>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
          >
            <svg viewBox="0 0 512 512" className="w-4 h-4 fill-current">
              <path d="M459.37 151.716c.32 4.52.32 9.09.32 13.65 0 139.87-106.96 301.1-301.1 301.1-60.16 0-116.7-17.55-164.9-47.77 8.53.99 17.45 1.51 26.39 1.51 51.4 0 98.76-17.62 136.64-47.23-48.04-.9-88.58-32.5-102.64-75.87 6.8 1.27 13.66 1.99 20.6 1.99 10.02 0 19.86-1.35 29.05-3.79-50.27-10.07-88.03-54.13-88.03-106.86 0-.47 0-.93.02-1.39 14.78 8.21 31.66 13.12 49.56 13.68-29.4-19.55-48.96-52.96-48.96-90.29 0-19.89 5.36-38.52 14.68-54.64 53.71 65.82 134.53 108.22 225.23 112.18-1.84-8.29-2.77-16.99-2.77-25.84 0-62.59 50.77-113.36 113.36-113.36 32.63 0 62.03 13.76 82.47 35.83 25.75-5.06 49.96-14.49 71.8-27.48-8.46 26.4-26.23 48.62-49.6 62.68 22.69-2.71 44.26-8.69 64.24-17.47-15.05 22.47-33.9 42.21-55.48 57.88z"></path>
            </svg>
          </a>
          <a
            href="#"
            aria-label="Email"
            className="p-2 rounded-md dark:text-gray-800 hover:dark:text-violet-600"
          >
            <svg viewBox="0 0 512 512" className="w-4 h-4 fill-current">
              <path d="M502.3 190.8L327.4 346.8c-12.5 11.4-32.7 11.4-45.2 0L9.7 190.8C3.5 185.6 0 178.1 0 170.5c0-14.3 11.6-26 26-26h460c14.3 0 26 11.6 26 26 0 7.6-3.5 15.1-9.7 20.3zM0 170.5c0-14.3 11.6-26 26-26h460c14.3 0 26 11.6 26 26 0 7.6-3.5 15.1-9.7 20.3L262.6 354.4c-12.5 11.4-32.7 11.4-45.2 0L9.7 190.8C3.5 185.6 0 178.1 0 170.5z"></path>
            </svg>
          </a>
        </div>
      </div>

      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">User Route</h1>
        <p className="text-gray-700 mb-2">
          Current Location:{" "}
          <span className="font-semibold">{location.pathname}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Current Search:{" "}
          <span className="font-semibold">{location.search}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Current Hash: <span className="font-semibold">{location.hash}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Current User:{" "}
          <span className="font-semibold">{JSON.stringify(user)}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Current Location:{" "}
          <span className="font-semibold">{JSON.stringify(location)}</span>
        </p>
        <p className="text-gray-700">
          Current History:{" "}
          <span className="font-semibold">{JSON.stringify(history)}</span>
        </p>
      </div>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default UserTest;
