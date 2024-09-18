import { useEffect, useState } from "react";

const DashBoard = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("data"));
    setData(getData);
  }, []);

  return (
    <div>
      <div className="w-full h-screen">
        <main className=" justify-center items-center">
          <h1 className="text-3xl text-center">Welcome</h1>
          <br />
          <div className="flex justify-center">
            <ul>
              <li>Name: {data?.firstName}</li>
              <li>Last Name: {data?.lastName}</li>
              <li>Hobby: {data?.hobby}</li>
              <li>Gender: {data?.gender}</li>
              <li>Email: {data?.email}</li>
              <li>Phone Number: {data?.phoneNumber}</li>
              <li>Password: {data?.passWord}</li>
              <li>Confirm Password: {data?.comfirmPassWord}</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
