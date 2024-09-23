import method from "../../assets/methods.png";

const Copyright = () => {
  return (
    <>
      {/* copyright */}
      <div className="bg-gray-800 py-4">
        <div className="container flex items-center justify-between">
          <p className="text-white">© TailCommerce - All Right Reserved</p>
          <div>
            <img src={method} alt="methods" className="h-5" />
          </div>
        </div>
      </div>
      {/* ./copyright */}
    </>
  );
};

export default Copyright;
