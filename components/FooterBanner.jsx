import React from 'react'
import Link from 'next/link';

import { urlFor } from '../lib/client';

const FooterBanner = ({ bannerData : { discount, largeText1, largeText2, saleTime, image, product, smallText, midText, desc, buttonText} }) => {
    return (
        <div className="footer-banner">
            <div className="footer-banner-heading">
                <div className='footer__banner-flex'>
                    <p className='p__text'>{discount}</p>
                    <p className='p__text'>{saleTime}</p>
                </div>
                <h1 className='head__text'>{largeText1}</h1>
                <h2 className='head__text'>{largeText2}</h2>
            </div>
            <div className='footer__img'>
                <img 
                    src={urlFor(image)}
                    width={144}
                    height={144}
                    alt='an item image'
                />
            </div>
            <div className='footer__footer'>
                <p className='p__text'>{smallText}</p>
                <h2 className='head__text'>{midText}</h2>
                <p className='p__text'>{desc}</p>
                <div>
                    <Link href={`/products/${product}`}>
                        <button type="button" className="btn">{buttonText}</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FooterBanner