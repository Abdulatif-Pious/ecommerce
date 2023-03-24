import React from 'react'
import Link from 'next/link';

import { urlFor } from '../lib/client';

const HeroBanner = ({ bannerData : { smallText, midText, largeText1, image, buttonText, product } }) => {
  return (
    <div className="banner-container">
      <div className="banner-heading">
        <div>
          <p className='p__text' style={{ textAlign: 'center' }}>{smallText}</p>
          <h1 className='head__text'>{midText}
            <span> {largeText1} </span>
          </h1>
        </div>
        <div className='btn__container'>
          <Link href={`/products/${product}`}>
            <button type="button" className="btn">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
      <div className='img__container'>
        <div className='banner__img'>
          <img
            src={urlFor(image)}
            height={144}
            width={144}
            alt="product image"
            className="banner-img"
          />
        </div>
      </div>
      <div className='banner__footer'>
        <div className='banner__desc'>
          <h4>Description</h4>
          <p>{smallText}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner;
