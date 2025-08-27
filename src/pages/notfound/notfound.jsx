import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F9F1E7] px-4">
      <h1 className="text-[120px] font-extrabold text-[#B88E2F] leading-none mb-4">
        404
      </h1>
      <p className="text-2xl text-gray-700 mb-8 font-medium">
        Xech narsa topilmadi!
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#B88E2F] text-white cursor-pointer px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-[#a77a1f] transition-colors duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
