import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* Background */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70')]
                   bg-cover bg-center scale-110 rotate-[-12deg]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">

        <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight animate-fade-in">
          Start something epic.
        </h1>

        <Link to="/login">
          <button
            className="mt-8 px-10 py-4 rounded-full
                       bg-gradient-to-r from-pink-500 to-red-500
                       text-white text-lg font-semibold
                       hover:scale-110 transition-transform duration-300
                       animate-slide-down"
          >
            Create account
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Landing;
