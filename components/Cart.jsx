import React from 'react';
import { AiOutlineClose, AiFillDelete, AiOutlineShopping, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { useStateContext } from '../context/StateContext';
import { urlFor } from "../lib/client";

const Cart = () => {
  const { handleShowCart, handleToggleCartQuantity, totalQuantities, removeItem, cartItems, totalPrice } = useStateContext();

  return (
    <div className='cart__wrapper'>
      <div className="cart__container">
        <div className='cart__1'>
          <div className='cart__1-close'>
            <AiOutlineClose onClick={handleShowCart} fontSize={30} style={{ margin : " 0 1rem" }} />
          </div>
          <h4>Your cart <span>({totalQuantities} items)</span></h4>
        
          {!totalQuantities ? (
            <div className='empty__cart-container'>
              <AiOutlineShopping  />
              <p className='p__text'>Your shopping bag is empty</p>
              <button type="button" onClick={handleShowCart}>Continue Shopping</button>
            </div>
          ) : (
            <div className='cart__items-container'>
              {cartItems?.map((product, index) => (
                <div className="cart__item-container" key={`${new Date().getTime()}__${index}`}>
                  <div className='cart__item-info__container'>
                    <div className='cart__item-info-img'>
                      <img 
                        src={urlFor(product?.image[0])}
                        width={122}
                        height={122}
                        alt="product image"
                      />
                    </div>
                    <div className='cart__item-info'>
                      <h4 className='bold__text'>
                        {product?.name}
                      </h4>
                      <div className="quantity-container">
                        <span onClick={() => handleToggleCartQuantity(product?._id, "dec")}>
                          <AiOutlineMinus />
                        </span>
                        <span className='p__text number'>{product?.quantity}</span>
                        <span onClick={() => handleToggleCartQuantity(product?._id, "inc")}>
                          <AiOutlinePlus className='green' />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='cart__item-price'>
                    <h4 className='bold__text'>${product?.price}</h4>
                    <AiFillDelete onClick={() => removeItem(product?._id)}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {totalQuantities && (
          <div className='cart__2'>
            <div className='cart__subtotal'>
              <h4 className='bold__text'>Subtotal:</h4>
              <h4 className='bold__text'>${totalPrice}</h4>
            </div>
            <button type='button' className='stripe'>
              pay with stripe
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;