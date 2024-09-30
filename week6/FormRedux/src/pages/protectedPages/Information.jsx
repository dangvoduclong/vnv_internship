import { useSelector } from "react-redux";
import Loading from "../home/components/Loading";

const Information = () => {
  const userData = useSelector((state) => state.user.userData);

  if (!userData) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-green-50 rounded shadow p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          User Information
        </h2>
        <ul className="space-y-3">
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">First Name:</span>
            <span className="text-gray-600">{userData.firstName}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Last Name:</span>
            <span className="text-gray-600">{userData.lastName}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Role:</span>
            <span className="text-gray-600">
              {userData.roles.join(", ") || "N/A"}
            </span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Hobby:</span>
            <span className="text-gray-600">
              {userData.hobby === "other"
                ? userData.otherHobby
                : userData.hobby || "N/A"}
            </span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Gender:</span>
            <span className="text-gray-600">{userData.gender}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Country:</span>
            <span className="text-gray-600">{userData.country}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">City:</span>
            <span className="text-gray-600">{userData.city || "N/A"}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-600">{userData.email}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Phone Number:</span>
            <span className="text-gray-600">{userData.phoneNumber}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Password:</span>
            <span className="text-gray-600">{userData.passWord}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium text-gray-700">Confirm Password:</span>
            <span className="text-gray-600">{userData.confirmPassWord}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Information;
