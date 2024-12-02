import React, { useEffect } from 'react'
import './CategorySec.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../../../State/CategorySlice'

const CategorySec = () => {

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category)
  console.log(categories);
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div className='mx-4 my-70'>
      <div className="row d-flex align-items-center justify-content-between mb-4 ">
        <div className="col px-0 text-center">
          <p className='ps-3 crimson-pro fs-36 tracking-wide uppercase mb-0'>shop by Category</p>
        </div>
      </div>
      <div className="row d-flex flex-wrap justify-content-start">

        {
          categories.map(c => (
            <>
              <div key={c.id} className="col-2 flex-start text-center">
                <div className=''>
                  <div className="image-catgeory p-1 " >
                    <a href={`/${c.categoryName}`} className='no-underline'>
                      <img src={c.image} alt="" />
                    </a>
                  </div>
                  <p className='text-gray-800 text-xl pt-2  poppins fw-500 tracking-wide capitalize'>
                    <a href={`/${c.categoryName}`} className='no-underline'>
                      {c.categoryName}
                    </a>
                  </p>
                </div>
              </div>
            </>
          ))
        }

      </div>

    </div>
  )
}

export default CategorySec
