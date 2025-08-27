import { useCartStore } from "../../store/cartStore";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    decreaseQuantity,
    getCartTotal,
    clearCart,
  } = useCartStore();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Cart bo'sh
          </h2>
          <p className="text-gray-500 mb-6">
            Hali hech qanday mahsulot qo'shilmagan
          </p>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 inline-block"
          >
            Mahsulotlarni ko'rish
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cartni tozalash
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                Cartda jami: {cartItems.length} ta turli mahsulot, Umumiy
                miqdor:{" "}
                {cartItems.reduce((total, item) => total + item.quantity, 0)} ta
              </p>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80x80?text=No+Image";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{item.brand}</p>
                    <p className="text-xl font-bold text-blue-600 mb-2">
                      ${item.price}
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                        title="Miqdorni kamaytirish"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => useCartStore.getState().addToCart(item)}
                        className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                        title="Miqdorni oshirish"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500 font-medium mb-2">
                      Jami: ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
                    title="Cartdan olib tashlash"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mahsulotlar soni:</span>
                  <span className="font-semibold">{cartItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Umumiy miqdor:</span>
                  <span className="font-semibold">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-gray-800">
                      Jami:
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                Buyurtma berish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
