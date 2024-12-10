// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductsByCategory } from '../../../State/ProductSlice';
// import { Link } from 'react-router-dom';
// import { FaArrowRightLong } from 'react-icons/fa6';

// let globalRenderedProductIds = new Set(); // Global set to track rendered product IDs

// const HomeMain = ({ sectionName, category, resetRenderedIds }) => {
//   const dispatch = useDispatch();
//   const { productsByCategory, loading, errorByCategory } = useSelector((state) => state.products);

//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [localRenderedIds, setLocalRenderedIds] = useState(new Set());

//   useEffect(() => {
//     // Fetch products for the current category
//     dispatch(fetchProductsByCategory(category));

//     // Optionally clear local tracking for this carousel (not global)
//     if (resetRenderedIds) {
//       setLocalRenderedIds(new Set());
//     }
//   }, [dispatch, category, resetRenderedIds]);

//   useEffect(() => {
//     const products = productsByCategory[category] || [];
//     // Filter products to exclude those already rendered globally or locally
//     console.log(products, globalRenderedProductIds, localRenderedIds, 'pdts')

//     const nonDuplicateProducts = products.filter(

//       (product) => {
//         const inGlobal = globalRenderedProductIds.has(product._id);
//         const inLocal = localRenderedIds.has(product._id);
//         console.log(product._id, inGlobal, inLocal, 'checking ids');
//         return !inGlobal && !inLocal;
//         // !globalRenderedProductIds.has(product._id) && !localRenderedIds.has(product._id)
//       }
//     );
//     console.log(nonDuplicateProducts, 'ndp')
//     // Update filtered products for this carousel
//     setFilteredProducts(nonDuplicateProducts);

//     // Update global and local tracking for rendered product IDs
//     nonDuplicateProducts.forEach((product) => {
//       globalRenderedProductIds.add(product._id);
//       setLocalRenderedIds((prev) => new Set([...prev, product._id]));
//     });
//   }, [productsByCategory, category]);

//   const renderProduct = (product) => (
//     <a href={`/product/${product._id}`} key={product._id} className="cursor-pointer no-underline">
//       <div className="relative group overflow-hidden transition">
//         {/* Image Container */}
//         <div className="relative h-[250px] lg:h-[400px] overflow-hidden group">
//           <img
//             src={product.images?.[1] || '/default-image.jpg'}
//             alt={product.productName || 'Product Image'}
//             className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:translate-x-full"
//           />
//           <img
//             src={product.images?.[0] || '/default-image.jpg'}
//             alt={product.productName || 'Product Image'}
//             className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 -translate-x-full group-hover:translate-x-0"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="pt-3 no-underline text-left">
//           <h3 className="fs-17 tracking-widest font-semibold uppercase mb-1 text-sec opacity-90 no-underline truncate crimson-pro">
//             {product.productName}
//           </h3>
//           <p className="roboto font-medium text-sm mb-0">
//             <span className="pe-2 text-sec opacity-90 tracking-widest uppercase montserrat-a fs-14">
//               Final Price: ₹{product.price}
//             </span>
//             <span className="text-green-800 font-semibold opacity-60 mt-1">
//               Save ₹{product.mrp - product.price} ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off)
//             </span>
//           </p>
//         </div>
//       </div>
//     </a>
//   );

//   if (loading) return <div>Loading...</div>;
//   if (errorByCategory?.[category]) return <div className="text-red-500">{errorByCategory[category].message}</div>;
//   if (filteredProducts.length === 0) return <div>No products found in this category.</div>;

//   return (
//     <div className="container-fluid my-10 lg:my-20">
//       <div className="row mt-2 mb-4 flex justify-between">
//         <div className="col-12 flex justify-between">
//           <h3 className="crimson-pro text-3xl ps-3 lg:text-4xl tracking-widest fs-400 uppercase mb-0">{sectionName}</h3>
//           <Link
//             to={`/${category}`}
//             className="montserrat-a no-underline flex items-center px-5 py-2"
//             style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}
//           >
//             <span className="pe-3 fs-14 uppercase text-gray-800 font-medium">View All</span>
//             <FaArrowRightLong />
//           </Link>
//         </div>
//       </div>

//       {/* Render products */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-3">
//         {filteredProducts.slice(0, 4).map(renderProduct)}
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-3">
//         {filteredProducts.slice(4, 8).map(renderProduct)}
//       </div>
//     </div>
//   );
// };

// export default HomeMain;
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../../State/ProductSlice';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';

// Global tracking of rendered product IDs
let globalRenderedProductIdsBySection = new Map();

const HomeMain = ({ sectionName, category, resetRenderedIds, resetGlobalRenderedIds }) => {
  const dispatch = useDispatch();
  const { productsByCategory, loading, errorByCategory } = useSelector((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [localRenderedIds, setLocalRenderedIds] = useState(new Set());
  const renderedIdsRef = useRef(new Set());

  useEffect(() => {
    // Fetch products for the current category
    dispatch(fetchProductsByCategory(category));
    if (resetRenderedIds) {
      console.log('Resetting local rendered IDs for section:', sectionName);
      setLocalRenderedIds(new Set());
    }
    if (resetGlobalRenderedIds) {
      console.log('Resetting global rendered IDs for section:', sectionName);
      globalRenderedProductIdsBySection.set(sectionName, new Set());
    }

  }, [dispatch, category, resetRenderedIds, resetGlobalRenderedIds, sectionName]);

  useEffect(() => {
    const products = productsByCategory[category] || [];
    console.log('Raw Products:', products);

    const globalRenderedIds = globalRenderedProductIdsBySection.get(sectionName) || new Set();
    console.log('Global Rendered IDs:', globalRenderedIds);
    console.log('Local Rendered IDs:', localRenderedIds);

    const nonDuplicateProducts = products.filter((product) => {
      const inGlobal = globalRenderedIds.has(product._id);
      const inLocal = localRenderedIds.has(product._id);
      console.log(`Checking Product ${product._id}: Global=${inGlobal}, Local=${inLocal}`);
      return !inGlobal && !inLocal;
    });

    console.log('Non-Duplicate Products:', nonDuplicateProducts);
    setFilteredProducts(nonDuplicateProducts);

    nonDuplicateProducts.forEach((product) => {
      globalRenderedIds.add(product._id);
      setLocalRenderedIds((prev) => new Set([...prev, product._id]));
    });

    globalRenderedProductIdsBySection.set(sectionName, globalRenderedIds);
  }, [productsByCategory, category, sectionName]);


  const renderProduct = (product) => (
    <a href={`/product/${product._id}`} key={product._id} className="cursor-pointer no-underline">
      <div className="relative group overflow-hidden transition">
        {/* Image Container */}
        <div className="relative h-[250px] lg:h-[400px] overflow-hidden group">
          <img
            src={product.images?.[1] || '/default-image.jpg'}
            alt={product.productName || 'Product Image'}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:translate-x-full"
          />
          <img
            src={product.images?.[0] || '/default-image.jpg'}
            alt={product.productName || 'Product Image'}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 -translate-x-full group-hover:translate-x-0"
          />
        </div>

        {/* Product Details */}
        <div className="pt-3 no-underline text-left">
          <h3 className="fs-17 tracking-widest font-semibold uppercase mb-1 text-sec opacity-90 no-underline truncate crimson-pro">
            {product.productName}
          </h3>
          <p className="roboto font-medium text-sm mb-0">
            <span className="pe-2 text-sec opacity-90 tracking-widest uppercase montserrat-a fs-14">
              Final Price: ₹{product.price}
            </span>
            <span className="text-green-800 font-semibold opacity-60 mt-1">
              Save ₹{product.mrp - product.price} ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off)
            </span>
          </p>
        </div>
      </div>
    </a>
  );

  if (loading) return <div>Loading...</div>;
  if (errorByCategory?.[category]) return <div className="text-red-500">{errorByCategory[category].message}</div>;
  if (filteredProducts.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className="container-fluid my-10 lg:my-20">
      <div className="row mt-2 mb-4 flex justify-between">
        <div className="col-12 flex justify-between">
          <h3 className="crimson-pro text-3xl ps-3 lg:text-4xl tracking-widest fs-400 uppercase mb-0">{sectionName}</h3>
          <Link
            to={`/${category}`}
            className="montserrat-a no-underline flex items-center px-5 py-2"
            style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}
          >
            <span className="pe-3 fs-14 uppercase text-gray-800 font-medium">View All</span>
            <FaArrowRightLong />
          </Link>
        </div>
      </div>

      {/* Render products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-3">
        {filteredProducts.slice(0, 4).map(renderProduct)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-3">
        {filteredProducts.slice(4, 8).map(renderProduct)}
      </div>
    </div>
  );
};

export default HomeMain;
