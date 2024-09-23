const ErrorPage = () => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 flex flex-col-reverse lg:flex-row items-center gap-16">
      <div className="relative w-full xl:w-1/2 pb-12 lg:pb-0">
        <div className="absolute">
          <h1 className="my-2 text-gray-800 font-bold text-2xl">
            Looks like you have found the doorway to the great nothing
          </h1>
          <p className="my-2 text-gray-800">
            Sorry about that! Please visit our homepage to get where you need to
            go.
          </p>
          <button className="my-2 border rounded py-4 px-8 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
            Take me there!
          </button>
        </div>
        <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="404" />
      </div>
      <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Group" />
    </div>
  );
};

export default ErrorPage;
