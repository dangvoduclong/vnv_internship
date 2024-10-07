import { useEffect } from "react";
import { useGetUserDetail } from "../../hooks/useUserDetail";

const GetPages = () => {
  const userId = 4;
  const { userDetail, loading, error, getUserDetail } = useGetUserDetail(false);
  useEffect(() => {
    getUserDetail(userId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1>User Details</h1>

      <pre>{JSON.stringify(userDetail, null, 2)}</pre>
    </div>
  );
};

export default GetPages;
