import React from 'react'

import { HeroBanner, FooterBanner, Product } from '../components';
import { client } from '../lib/client'


const Home = ({  products, bannerData }) => {

  return (
    <div className="app-container">
      <div>
        <HeroBanner bannerData={bannerData.length && bannerData[0]} />
      </div>
      <div className="product-wrapper">
        <div className="product-heading">
          <h2 className='head__text'>The best seller products</h2>
          <p className='p__text'>There are many variation passages</p>
        </div>
        <div className="product-container">
          {products?.map((product) => <Product key={product?._id} product={product}/> )}
        </div>
      </div>

      <div>
        <FooterBanner bannerData={bannerData && bannerData[0]}/>
      </div>
    </div>
    
  )
}

export default Home;

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]'
  const products = await client.fetch(productQuery); 

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);


  return {
    props : { products, bannerData }
  }

} 