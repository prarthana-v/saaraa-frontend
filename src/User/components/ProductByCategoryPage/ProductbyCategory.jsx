import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Productcard from './ProductCard.jsx'
import { multiplefilters, singlefilter } from './FilterData.js'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchProductsByCategory } from '../../../State/ProductSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductbyCategory = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  // console.log(categoryName)

  useSelector((state) => console.log(state.products))
  const { productsByCategory, loading, errorByCategory } = useSelector((state) => state.products);
  console.log(productsByCategory)

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleFilter = (id, value) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.get(id)?.split(",") || [];

    // Check if the current filter value already includes the selected value
    if (filterValue.includes(value)) {
      // If the value is included, remove it from the filter
      filterValue = filterValue.filter((item) => item !== value);

      // If no values remain, delete the filter key
      if (filterValue.length === 0) {
        searchParams.delete(id);
      } else {
        // Otherwise, set the remaining values
        searchParams.set(id, filterValue.join(","));
      }
    } else {
      // If the value isn't included, add it to the filter
      filterValue.push(value);
      searchParams.set(id, filterValue.join(","));
    }

    // Update the URL with the new query parameters
    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleRadioFilter = (e, id) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(id, e.target.value);
    navigate({ search: `?${searchParams.toString()}` });

  }

  const clearAllFilters = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.forEach((value, key) => {
      searchParams.delete(key);
    });
    navigate({ search: `?${searchParams.toString()}` });
  };

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryName))
  }, [dispatch, categoryName]);


  return (
    <div className="bg-utility mt-[6.5rem]">
      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative lg:hidden mt-40 ">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full xs:mt-[13rem] md:mt-[9rem]"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              {multiplefilters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-2 px-4">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium  text-gray-900">{section.name}</span>
                        <button
                          type="button"
                          onClick={clearAllFilters}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Clear All Filters
                        </button>
                        <span className="ml-6 flex items-center">
                          {/* Show the + icon when the section is closed */}
                          {!open && (
                            <PlusIcon aria-hidden="true" className="h-5 w-5" />
                          )}
                          {/* Show the - icon when the section is open */}
                          {open && (
                            <MinusIcon aria-hidden="true" className="h-5 w-5" />
                          )}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                onChange={(e) => handleFilter(section.id, option.value, e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="container mt-5">
        <div className="row">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center py-3">
            <h1 className="text-sm italic opacity-60 font-semibold uppercase text-gray-800 mb-0">
              Home / {categoryName}s
            </h1>
            <div className="d-flex align-items-center gap-3">
              <div className="relative">
                <Menu>
                  <Menu.Button className="text-sm text-gray-600 d-flex align-items-center">
                    Sort
                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={`block px-4 py-2 text-sm ${active ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700'
                              }`}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="lg:hidden p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>
        <div className="row">
          {/* Filter Sidebar */}
          <aside className="col-lg-3 col-md-4 mb-4">
            <div className=" p-4 rounded-lg border border-gray-300 sticky top-16">
              <h2 className="text-lg font-bold mb-4">Filters</h2>
              <form className="space-y-6">
                {multiplefilters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-300 pb-4">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between items-center w-full text-left text-gray-700 hover:text-pprimary">
                          <span className="text-md font-medium">{section.name}</span>
                          <span className="ml-2">
                            {!open ? (
                              <PlusIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                              <MinusIcon className="h-5 w-5 text-gray-400" />
                            )}
                          </span>
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-3">
                          {section.options.map((option, idx) => (
                            <div key={idx} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`filter-${section.id}-${option.value}`}
                                name={`${section.id}[]`}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                defaultChecked={option.checked}
                                onChange={(e) =>
                                  handleFilter(section.id, option.value, e.target.checked)
                                }
                              />
                              <label
                                htmlFor={`filter-${section.id}-${option.value}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 tracking-wider poppins hover:underline"
                >
                  Clear All Filters
                </button>
              </form>
            </div>
          </aside>
          {/* Main Content */}
          <main className="col-lg-9 col-md-8">
            {/* Product Grid */}
            <div className="row">
              {productsByCategory[categoryName]?.map((product, idx) => (
                <div className="col-6 col-sm-6 col-md-4  mb-4" key={product._id || idx}>
                  <Productcard product={product} />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

    </div>

  )
}
export default ProductbyCategory
// import { useState, useEffect } from 'react'
// // import { XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
// import Productcard from '../ProductByCategoryPage/ProductCard.jsx'
// import { multiplefilters, singlefilter } from './FilterData.js'
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { fetchProductsByCategory } from '../../../State/ProductSlice.js';
// import { useDispatch, useSelector } from 'react-redux';
// const Product = () => {
//   const { categoryName } = useParams();
//   const { productsByCategory } = useSelector((state) => state.products);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchProductsByCategory(categoryName));
//   }, [dispatch, categoryName]);

//   const handleFilter = (id, value) => {
//     const searchParams = new URLSearchParams(location.search);
//     let currentFilter = searchParams.get(id)?.split(",") || [];
//     if (currentFilter.includes(value)) {
//       currentFilter = currentFilter.filter((item) => item !== value);
//     } else {
//       currentFilter.push(value);
//     }
//     searchParams.set(id, currentFilter.join(","));
//     navigate({ search: `?${searchParams.toString()}` });
//   };

//   return (
//     <div className="bg-gray-100 mt-[7.5rem]">
//       {/* Sticky Filters */}
//       <div className="sticky top-0 z-50 bg-white border-b shadow-md">
//         <div className="flex flex-wrap items-center justify-between px-4 py-3">
//           <h1 className="text-2xl font-semibold tracking-tight text-gray-800 uppercase">
//             {categoryName}'s Collection
//           </h1>
//         </div>
//         <div className="flex overflow-x-auto space-x-4 px-4 py-2 bg-white relative">
//           {/* Example Filter Dropdowns */}
//           {multiplefilters.map((filter) => (
//             <div key={filter.id} className="">
//               <div className="group">
//                 <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
//                   {filter.name}
//                   <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-500" />
//                 </button>
//                 <div className="absolute hidden mt-2 bg-white border rounded shadow-lg group-hover:inline">
//                   {filter.options.map((option) => (
//                     <div
//                       key={option.value}
//                       className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     >
//                       <input
//                         type="checkbox"
//                         id={option.value}
//                         value={option.value}
//                         onChange={() => handleFilter(filter.id, option.value)}
//                         className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                       />
//                       <label
//                         htmlFor={option.value}
//                         className="ml-2 text-sm text-gray-600"
//                       >
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <main className="px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-4">
//           {/* Product Grid */}
//           <div className="col-span-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//             {productsByCategory[categoryName]?.map((product, i) => (
//               <Productcard key={product._id || i} product={product} />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Product;
