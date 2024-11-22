import React from 'react'
import categories from '../../../Data/categories.js'
import './CategorySec.css'
import { Link } from 'react-router-dom'

const CategorySec = () => {
  return (
    <div className='container my-70'>
      <div className="row d-flex align-items-center justify-content-between mb-4 ">
        <div className="col-2 px-0">
          <h2 className='h2 poppins mb-0'>Categories</h2>
        </div>
        <div className="col-3 px-0 d-flex justify-content-end">
          <Link to={'/categories'} className='bg-rose rounded-pill px-3 py-2 text-white fw-500 fs-15 poppins'>View All Categories</Link>
        </div>
      </div>
      <div className="row d-flex flex-wrap justify-content-around">

        {
          categories.map(c => (

            <div key={c.id} className="col-1 px-1">
              <div className="d-flex justify-content-center">
                <div className="category-image shadow p-1 border">
                  <img src={c.image} alt="" />
                </div>
              </div>
              <p className='category-name fs-15 text-sec text-center'>{c.name}</p>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default CategorySec
