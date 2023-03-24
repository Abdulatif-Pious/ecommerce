import React, { useState } from 'react';
import {  AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { urlFor, client } from '../../lib/client';
import  Product from '../../components/Product';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { incQty, decQty, qty, addToCart, handleShowCart } = useStateContext();

  const [index, setIndex] = useState(0);

  const purchaseNow = () => {
    addToCart(product, qty);
    handleShowCart();
  }

  return (
    <>
      <div className="product__details-container">
        <div className="product__images-container">
          <div className='product__image-container'>
            <img 
              src={urlFor(product?.image[index])}
              alt="product image"
            />
          </div>
          <div>
            {product?.image.map(({ asset : { _ref } }, i) =>(
              <img 
                key={`${i}${_ref}`}
                className={`${index === i && "active-img"} product-details-small-img`}
                src={urlFor(_ref)}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product__details-item">
          <h3 className='bold__text'>
            {product?.name}
          </h3>
          <div className='star__container'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <span className='app__text'> (25) </span>
          </div>
          <h4 className='bold__text'>Details:</h4>
          <p className='p__text' style={{ margin: '0.5rem 0'}}>{product?.details}</p>
          <h4 className='bold__text' style={{color : "#ff0945", margin: '0.5rem 0' }}>${product?.price}</h4>
          <div className='quantity__wrapper'>
            <h4 className='bold__text'>Quantity:</h4>
            <div className='quantity-container'>
              <span onClick={decQty}><AiOutlineMinus/></span>
              <span className='p__text number'>{qty}</span>
              <span onClick={incQty} ><AiOutlinePlus style={{ color: 'green' }} /></span>
            </div>
          </div>
          <div className='product__details-btn-container'>
            <button className="product-details-btn" onClick={() => addToCart(product, qty)} >Add to Cart</button>
            <button className="product-details-btn" onClick={purchaseNow}>Purchase now</button>
          </div>
        </div>
      </div>

      <div >
        <h2 className='bold__text' style={{ textAlign : "center", margin: "2rem 0"}}>You may also like</h2>
        <div className="product-container ">
            {products?.map((product, index) => <Product key={`${product.name}${index}`} product={product}/>)}
        </div>
      </div>
    </>
  )
};

export const getStaticPaths = async () => {
    const productsQuery = `*[_type == "product"] {
        slug  {
            current
        }
    }`;

    const products = await client.fetch(productsQuery);

    const paths = products.map((product) => ({
        params : {
            slug : product.slug.current
        }
    }));

    return {
        paths,
        fallback : false
    }
}

export const getStaticProps = async ({ params : { slug } }) => {
    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const products = await client.fetch(productsQuery); 
    const product = await client.fetch(productQuery);
    
    return {
        props : { product, products }
    }
};

export default ProductDetails;