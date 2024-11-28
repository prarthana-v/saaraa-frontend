import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { Radio, RadioGroup } from '@headlessui/react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductDetails = ({ productDetails }) => {
  const {
    _id,
    productName,
    price,
    images,
    description,
    stock,
    discount,
    sizes,
    categoryName,
    status,
  } = productDetails;

  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(null); // Placeholder for colors if added later
  const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0] : null);

  const handleAddToCart = () => {
    navigate('/cart');
  };

  const handlProductDeatils = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                  {categoryName || 'Category'}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {productName || 'Product Name'}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                alt={productName}
                src={images[0] || ''}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center mt-4">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem]"
                >
                  <img
                    alt={`Product image ${index + 1}`}
                    src={src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm-px-16 lg:max-w-7xl lg:px-8 lg:pb-20">
            <div className="lg:col-span-2">
              <p className="text-xl lg:text-xl font-semibold text-gray-900 sm:text-3xl poppins">
                {productName}
              </p>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold text-gray-900 montserrat">₹{price}</p>
                {discount >= 0 && (
                  <>
                    <p className="opacity-50 line-through poppins">₹{(price * (100 + discount)) / 100}</p>
                    <p className="text-green-600 font-semibold poppins">{discount}% off</p>
                  </>
                )}
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <Rating name="read-only" value={4} readOnly />
                  <p className="opacity-50 text-sm mb-0 ps-3">5648 Ratings</p>
                  <p className="ps-3 mb-0 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    117 reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                {sizes.length >= 0 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">Size</h3>
                      <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Size guide
                      </a>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-4">
                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                      >
                        {sizes.map((size, index) => (
                          <Radio
                            key={index}
                            value={size}
                            className="group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none"
                          >
                            <span>{size}</span>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>
                )}

                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  color="secondary"
                  className="mt-4 max-w-[12rem]"
                  sx={{ px: '2rem', py: '1rem', bgcolor: '#000' }}
                >
                  Add to Cart
                </Button>

                <Button
                  onClick={() => handlProductDeatils(_id)}
                  variant="contained"
                  color="secondary"
                  className="mt-4 max-w-[12rem]"
                  sx={{ px: '2rem', py: '1rem', bgcolor: '#000', ml: '2rem' }}
                >
                  Product Deatils
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description */}
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-gray-800">Description</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
