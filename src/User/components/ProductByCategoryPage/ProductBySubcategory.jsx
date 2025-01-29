import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchProductsBySubcategory } from '../../../State/ProductSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { multiplefilters } from './FilterData.js'
import {
  Disclosure,
} from '@headlessui/react'
import AddIcon from '@mui/icons-material/Add'; import RemoveIcon from '@mui/icons-material/Remove';
import Productcard from './ProductCard.jsx'


const ProductBySubcategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subcategoryName } = useParams();
  console.log(subcategoryName, 'snc')

  const { productsBysubCategory, categoryName, loading, error } = useSelector((state) => state.products);

  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let filters = {};
    searchParams.forEach((value, key) => {
      filters[key] = value.split(",");
    });
    setActiveFilters(filters); // Update active filters state
    dispatch(fetchProductsBySubcategory({ subcategoryName, filters }));
  }, [dispatch, location.search, subcategoryName]);

  const handleFilter = (id, value) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.get(id)?.split(",") || [];

    if (filterValue.includes(value)) {
      filterValue = filterValue.filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(id);
      } else {
        searchParams.set(id, filterValue.join(","));
      }
    } else {
      filterValue.push(value);
      searchParams.set(id, filterValue.join(","));
    }

    // Update activeFilters state
    setActiveFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (filterValue.length > 0) {
        newFilters[id] = filterValue;
      } else {
        delete newFilters[id];
      }
      return newFilters;
    });

    navigate({ search: `?${searchParams.toString()}` });
  };


  // Clear all filters
  const clearAllFilters = () => {
    navigate({ search: "" });
  };

  return (
    <div className="bg-utility mt-[8rem]">
      <div className="container">
        <div className="row">

          <div className="md:hidden fixed top-[88px] md:top-[103px] left-0 right-0 z-10 bg-white shadow-md px-4 py-2 flex justify-between items-center">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              className="text-sm text-pprimary font-medium bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              onClick={() => setIsOffCanvasOpen(true)}
            >
              Open Filters
            </button>
          </div>

          {/* Filter Sidebar */}
          <div className="hidden md:flex col-md-4 col-lg-2 mb-4">
            <div className="w-100 sticky top-16">
              <div className="border border-gray-300 rounded-lg p-2">
                <h2 className="text-lg font-bold mb-4">Filters</h2>
                <aside className="">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-sm bg-gray-400 px-2 py-2 rounded-lg text-white tracking-wider poppins"
                  >
                    Clear All Filters
                  </button>
                  {multiplefilters.map((filter) => (
                    <Disclosure key={filter.id}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full py-2 text-lg font-medium text-left">
                            {filter.name}
                            {open ? <RemoveIcon /> : <AddIcon />}
                          </Disclosure.Button>
                          <Disclosure.Panel className="pl-4">
                            {filter.options.map((option) => (
                              <div key={option.value} className="flex items-center mb-2">
                                <input
                                  type="checkbox"
                                  id={`${filter.id}-${option.value}`}
                                  checked={
                                    activeFilters[filter.id]?.includes(option.value) ||
                                    false
                                  }
                                  onChange={() => handleFilter(filter.id, option.value)}
                                  className="mr-2"
                                />
                                <label htmlFor={`${filter.id}-${option.value}`}>
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </aside>
              </div>
            </div>
          </div>

          {/* Mobile Off-Canvas Filters */}
          {isOffCanvasOpen && (
            <>
              <div className="fixed inset-0 pt-28 z-20 bg-white flex flex-col p-6 overflow-y-auto" style={{ width: '80%' }}>
                <div className="flex justify-between mb-5">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-sm bg-red-600 text-white px-6 py-2 rounded-md tracking-wider poppins hover:underline"
                  >
                    Clear All Filters
                  </button>
                  <button
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:text-gray-800"
                    onClick={() => setIsOffCanvasOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <form className="space-y-6">
                  {multiplefilters.map((section) => (
                    <div key={section.id} className="border-b border-gray-300 pb-4">
                      {/* <h3 className="text-lg font-medium">{section.name}</h3> */}
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex items-center py-1 text-lg font-medium text-left">
                              {open ? (
                                <span className="text-xl">-</span>
                              ) : (
                                <span className="text-xl">+</span>
                              )}
                              <span className="ml-2">{section.name}</span>
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
                    </div>
                  ))}
                </form>
              </div>
            </>
          )}


          {/* Product Grid */}
          <div div className="col-md-8 col-lg-10 w-full pt-10 md:pt-20 pt-md-0">
            <h1 className="md:hidden mb-3 text-sm montserrat-a opacity-60 uppercase text-gray-800 mb-0 ps-0">
              Home / {categoryName} / {subcategoryName}
            </h1>
            {error ? (
              <div className="col-12 text-center text-gray-600 font-medium p-4 rounded">
                {error.message}
              </div>
            ) : !productsBysubCategory[subcategoryName] ||
              productsBysubCategory[subcategoryName].length === 0 ? (
              <div className="col-12 text-center text-gray-500 p-4">
                No products available for this subcategory.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {productsBysubCategory[subcategoryName]?.map((product, idx) => (
                  <Productcard product={product} key={product._id || idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProductBySubcategory;
