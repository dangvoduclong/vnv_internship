import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative inline-block select-none whitespace-nowrap rounded-full bg-teal-500 px-3.5 py-1.5 align-baseline font-sans text-base font-bold uppercase leading-normal text-white ml-96">
        <div className="absolute top-1/2 left-1 h-5 w-5 transform -translate-y-1/2">
          <img
            className="rounded-full"
            width="18px"
            height="18px"
            alt="conan"
            src="https://i.pinimg.com/236x/83/70/06/83700657e99a879f29d8c7d33aa68cf0.jpg"
          />
        </div>
        <div className="ml-4 mt-px">
          <p className="block font-sans text-sm font-medium capitalize leading-none text-white antialiased">
            Hello
          </p>
        </div>
      </div>
      <div className="w-full pt-5 px-4 mb-8 mx-auto ">
        <div className="text-base text-gray-700 py-1">
          You can{" "}
          <Link
            to="/login"
            className="text-gray-700 font-semibold"
            target="_blank"
          >
            Login here.
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
