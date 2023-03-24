import React from 'react'
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product : {image, name, price, slug} }) => {
  return (
    <div>
      <Link href={`/products/${slug.current}`}>
        <div className="product-item">
          <div style={{ width : '260px', height : '270px'}}>
            <img 
              src={urlFor(image && image[0])}
              alt="product-image"
              className="product-img"
            />
          </div>
          <div className="product-footer">
            <h4 className='bold__text'>{name}</h4>
            <p className='p__text'>${price}</p>
          </div>
        </div>
      </Link>
    </div>
  
  )
}

export default Product