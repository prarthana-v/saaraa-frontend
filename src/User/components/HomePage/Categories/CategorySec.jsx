import React, { useEffect } from 'react'
import './CategorySec.css'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../../../State/CategorySlice'
import { fetchSubcategories } from '../../../../State/SubCategorySlice'
import './CategorySec.css'

const CategorySec = () => {

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category)
  const { subcategories } = useSelector((state) => state.subcategory)
  // console.log(categories, subcategories);

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchSubcategories())
  }, [dispatch])

  // Filter subcategories of 'women' and limit to first 4 items
  const womenCategory = categories.find((category) => category.categoryName.toLowerCase() === 'women');
  const womenSubcategories = womenCategory
    ? subcategories
      .filter((sub) => sub.categoryId._id === womenCategory._id) // Filter by 'women' category
      .slice(0, 4) // Limit to first 4 subcategories
    : [];

  // Filter subcategories of 'men' and limit to first 4 items
  const menCategory = categories.find((category) => category.categoryName.toLowerCase() === 'men');
  const menSubcategories = menCategory
    ? subcategories
      .filter((sub) => sub.categoryId._id === menCategory._id) // Filter by 'men' category
      .slice(0, 4) // Limit to first 4 subcategories
    : [];


  const formatUrl = (name) => {
    return encodeURIComponent(name).replace(/%20/, '-');
  };

  return (
    <div className='mx-4 my-5 lg:my-70'>
      <div className="row d-flex align-items-center justify-content-between mb-4 ">
        <div className="col px-0 text-center">
          <p className='ps-3 crimson-pro text-3xl lg:text-4xl tracking-wide uppercase mb-0'>shop by Category</p>
        </div>
      </div>
      <div className="row d-flex flex-wrap justify-content-start">
        {womenCategory && (
          <>
            <div key={womenCategory._id} className="col-12  mb-4">
              {/* Subcategories (Limited to 4) */}
              <div className="row d-flex flex-wrap">
                {womenSubcategories.map((subcategory) => (
                  <div key={subcategory._id} className="col-6 col-lg-3 flex-start text-center">
                    <div>
                      <div className="image-catgeory md:p-1">
                        <a
                          href={`/${formatUrl(womenCategory.categoryName)}/${formatUrl(subcategory.subcategoryName)}`}
                          className="no-underline"
                        >
                          <img src={subcategory.image} alt={subcategory.subcategoryName} />
                        </a>
                      </div>
                      <p className="text-gray-800 fs-15 pt-2 montserrat-a font-semibold tracking-wider capitalize">
                        <a
                          href={`/${womenCategory.categoryName}/${subcategory.subcategoryName}`}
                          className="no-underline"
                        >
                          {subcategory.subcategoryName}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Men Category Row */}
      <div className="row d-flex flex-wrap justify-content-start mt-3">
        {menCategory && (
          <>
            <div key={menCategory._id} className="col-12 mb-4">
              {/* Category Header */}
              <div className='flex justify-content-between mb-4'>
                <div className="col-2">
                  <p className="crimson-pro text-3xl text-4xl tracking-wide uppercase mb-0 ps-2">
                    {menCategory.categoryName}swear
                  </p>
                </div>
                <div className='col-2'>
                  <div className='w-full'>
                    <Link to={`/${menCategory.categoryName}`} className='montserrat-a  no-underline flex items-center justify-content-center py-2 px-3' style={{ borderColor: 'black', borderWidth: '1px', borderStyle: 'solid' }}>
                      <span className='pe-3 fs-14  uppercase text-gray-800 font-medium'>View all </span>  <FaArrowRightLong />
                    </Link>
                  </div>
                </div>
              </div>
              {/* Subcategories (Limited to 4) */}
              <div className="row d-flex flex-wrap">
                {menSubcategories.map((subcategory) => (
                  <div key={subcategory._id} className="col-4 flex-start text-center">
                    <div>
                      <div className="image-catgeory md:p-1 w-full h-[280px] lg:h-[550px]">
                        <a
                          href={`/${menCategory.categoryName}/${subcategory.subcategoryName}`}
                          className="no-underline"
                        >
                          <img src={subcategory.image} alt={subcategory.subcategoryName} className='w-full h-full object-cover object-top' />
                        </a>
                      </div>
                      <p className="text-gray-800 fs-15 pt-2 montserrat-a font-semibold tracking-wider capitalize">
                        <a
                          href={`/${menCategory.categoryName}/${subcategory.subcategoryName}`}
                          className="no-underline"
                        >
                          {subcategory.subcategoryName}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default CategorySec
