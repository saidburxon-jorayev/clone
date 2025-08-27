import { useState, useEffect } from "react";
import { api } from "../../api/index";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router";

function Home() {
  const [data, setData] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { addToCart, removeFromCart, cartItems } = useCartStore();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setData(res.data.products))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  return (
    <>
      <div className="flex flex-wrap justify-center gap-[32px]">
        {data?.map((product) => {
          // Check if product has multiple images
          const hasMultipleImages = product.images && product.images.length > 1;
          const hoverImage = hasMultipleImages
            ? product.images[1]
            : product.thumbnail;

          return (
            <div
              className=" w-[285px] h-[446px] cursor-pointer"
              key={product.id}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="thumbnail">
                <img
                  src={
                    hoveredProduct === product.id && hasMultipleImages
                      ? hoverImage
                      : product.thumbnail
                  }
                  alt=""
                />
              </div>
              <div className="w-[285px] pt-4 pl-4 pb-4 pr-4 h-[145px] bg-[#F4F5F7]">
                <h2 className="text-[#3A3A3A] text-[24px] truncate mb-2 font-semibold">
                  {product.title}
                </h2>
                <p className="mb-2 text-[#898989] text-[16px] font-medium">
                  {product.brand}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-[#3A3A3A] text-[20px] font-semibold">
                    ${product.price}
                  </p>
                  {cartItems.find((item) => item.id === product.id) ? (
                    // Agar mahsulot cartda bo'lsa, olib tashlash tugmasi
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(product.id);
                      }}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                      title="Cartdan olib tashlash"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  ) : (
                    // Agar mahsulot cartda bo'lmasa, qo'shish tugmasi
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
                      title="Cartga qo'shish"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
