import logo from "../../assets/react.svg";
const Footer = () => {
  return (
    <footer className=" bg-white pt-16 pb-12 border-t border-gray-100 ">
      <div className="grid grid-cols-1 ">
        <div className="col-span-1 space-y-4 p-4">
          <img src={logo} alt="logo" className="w-30" />
          <div className="mr-2">
            <p className="text-gray-500">Bye Bye!</p>
          </div>
          <div className="flex space-x-5">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fa-brands fa-facebook-square" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fa-brands fa-instagram-square" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fa-brands fa-twitter-square" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <i className="fa-brands fa-github-square" />
            </a>
          </div>
        </div>
        <div className=" col-span-2 grid grid-cols-2 text-center">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Solutions
              </h3>
              <div className="mt-4 space-y-4">
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Marketing
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Analitics
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Commerce
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Insights
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Support
              </h3>
              <div className="mt-4 space-y-4">
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Guides
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  API Status
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Solutions
              </h3>
              <div className="mt-4 space-y-4">
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Marketing
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Analitycs
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Commerce
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Insights
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Support
              </h3>
              <div className="mt-4 space-y-4">
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  Guides
                </a>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900 block"
                >
                  API Status
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
