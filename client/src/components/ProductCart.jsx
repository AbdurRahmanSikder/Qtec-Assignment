import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const [count, setCount] = React.useState(0);
  const { currency, cartItems, addToCart, removeFromCart, navigate } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-[200px] flex flex-col"
      >
        {/* Fixed height image container */}
        <div className="group cursor-pointer flex items-center justify-center px-2 h-40 overflow-hidden">
          <img
            className="group-hover:scale-105 transition object-contain max-h-full max-w-full"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Product details */}
        <div className="text-gray-500/60 text-sm flex flex-col flex-grow mt-3">
          <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>

          <div className="flex items-end justify-between mt-auto">
            <p className="md:text-xl text-base font-medium text-primary">
              {currency}
              {product.offerPrice}{' '}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}
                {product.price}
              </span>
            </p>

            <div onClick={(e) => e.stopPropagation()} className="text-primary">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() => setCount(() => removeFromCart(product._id))}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">{cartItems[product._id]}</span>
                  <button
                    onClick={() => setCount(() => addToCart(product._id))}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
