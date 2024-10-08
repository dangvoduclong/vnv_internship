import { useAuth } from "../context/AuthContext";
import dataCity from "../data/dataCity";
import Loading from "./Loading";
const PerInfo = () => {
  const { userData: data } = useAuth();

  if (!data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          User Information
        </h2>
        <ul className="space-y-3">
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">First Name:</span>
            <span className="text-gray-600">{data.firstName}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Last Name:</span>
            <span className="text-gray-600">{data.lastName}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Hobby:</span>
            <span className="text-gray-600">{data.hobby}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Gender:</span>
            <span className="text-gray-600">{data.gender}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Country:</span>
            <span className="text-gray-600">
              {(data.country &&
                dataCity.find((item) => item.nameCountry === data.country)
                  ?.nameCountry) ||
                "N/A"}
            </span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">City:</span>
            <span className="text-gray-600">{data.city || "N/A"}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-600">{data.email}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Phone Number:</span>
            <span className="text-gray-600">{data.phoneNumber}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Password:</span>
            <span className="text-gray-600">{data.passWord}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Confirm Password:</span>
            <span className="text-gray-600">{data.confirmPassWord}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PerInfo;
