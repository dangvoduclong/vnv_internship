import { useEffect, useState } from "react";
import { apiFetch, refreshAccessToken } from "../../axios/apiConfig";
import Loading from "../home/components/Loading";

const ProfileUserApiPages = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      let token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const data = await apiFetch("/auth/me", "GET", null, token);
        setUserData(data);
      } catch (error) {
        if (error.message.includes("401")) {
          try {
            const newTokens = await refreshAccessToken(refreshToken);
            localStorage.setItem("accessToken", newTokens.accessToken);
            localStorage.setItem("refreshToken", newTokens.refreshToken);
            const data = await apiFetch(
              "/auth/me",
              "GET",
              null,
              newTokens.accessToken
            );
            setUserData(data);
          } catch (refreshError) {
            setError(refreshError.message);
          }
        } else {
          setError(error.message);
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="h-screen p-6 bg-white rounded-lg shadow-lg border border-gray-200 overflow-auto">
      {error && (
        <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
      )}
      {userData ? (
        <div className="text-center">
          {/* Tiêu đề và ảnh đại diện */}
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{`${userData.firstName} ${userData.lastName}`}</h1>
          <img
            src={userData.image}
            alt={`${userData.firstName} ${userData.lastName}`}
            className="w-32 h-32 rounded-full border-4 border-indigo-500 mb-6 mx-auto shadow-lg transition-transform duration-300 transform hover:scale-105"
          />

          {/* Phần thông tin chia thành hai cột */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                { label: "ID", value: userData.id },
                { label: "Username", value: userData.username },
                { label: "Email", value: userData.email },
                { label: "First Name", value: userData.firstName },
                { label: "Last Name", value: userData.lastName },
                { label: "Gender", value: userData.gender },
                { label: "Age", value: userData.age },
                { label: "Birth Date", value: userData.birthDate },
                { label: "Blood Group", value: userData.bloodGroup },
                {
                  label: "Address",
                  value: `${userData.address.address}, ${userData.address.city}, ${userData.address.state} ${userData.address.stateCode}, ${userData.address.postalCode}`,
                },
                { label: "Phone", value: userData.phone },
                { label: "Height (cm)", value: userData.height.toFixed(2) },
                { label: "Weight (kg)", value: userData.weight.toFixed(2) },
                { label: "Eye Color", value: userData.eyeColor },
                { label: "Hair Color", value: userData.hair.color },
                { label: "Hair Type", value: userData.hair.type },
                { label: "Language", value: userData.language },
              ].map((item) => (
                <div
                  className="flex justify-between p-2 bg-gray-100 rounded-md shadow-sm"
                  key={item.label}
                >
                  <strong className="text-gray-600">{item.label}:</strong>
                  <span className="text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { label: "Company", value: userData.company.name },
                { label: "Job Title", value: userData.company.title },
                { label: "Department", value: userData.company.department },
                { label: "University", value: userData.university },
                { label: "Role", value: userData.role },
                { label: "SSN", value: userData.ssn },
                { label: "EIN", value: userData.ein },
                { label: "IP Address", value: userData.ip },
                { label: "MAC Address", value: userData.macAddress },
                { label: "User Agent", value: userData.userAgent },
                { label: "Bank Card Type", value: userData.bank.cardType },
                { label: "Bank Card Number", value: userData.bank.cardNumber },
                { label: "Bank Card Expiry", value: userData.bank.cardExpire },
                { label: "IBAN", value: userData.bank.iban },
                { label: "Crypto Coin", value: userData.crypto.coin },
                { label: "Crypto Wallet", value: userData.crypto.wallet },
                { label: "Crypto Network", value: userData.crypto.network },
              ].map((item) => (
                <div
                  className="flex justify-between p-2 bg-gray-100 rounded-md shadow-sm"
                  key={item.label}
                >
                  <strong className="text-gray-600">{item.label}:</strong>
                  <span className="text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProfileUserApiPages;
