import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import { useStateContext } from "../context/StateContext";
import { Cart } from './';

const Navbar = () => {
  const { showCart, handleShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <Link href='/' className="logo">
        <p>Abdulatif's products</p>
      </Link>
      <button type="button" className="cart-item" style={{ display : `${showCart ? 'hidden' : 'block'}`}} onClick={handleShowCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar