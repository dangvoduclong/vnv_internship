import banner from "../../../assets/banner-bg.jpg";
const Banner = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center py-36"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="container mx-auto text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl text-gray-800 font-semibold mb-6 capitalize leading-tight">
          Best Collection for <br /> Home Decoration
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam{" "}
          <br />
          accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores
          odio.
        </p>

        {/* Call to Action Button */}
        <div className="mt-8">
          <a
            href="#"
            className="bg-primary border border-primary text-white px-6 py-3 font-medium 
            rounded-md hover:bg-transparent hover:text-primary transition duration-300 ease-in-out"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
