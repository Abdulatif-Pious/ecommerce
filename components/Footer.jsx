import React from 'react'
import Link from 'next/link';

import {  AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer">
      <p className='p__text'>
        2023 Abdulatif's products All rights reserved
      </p>
      <div className="footer-icons">
        <Link href="/">
          <AiFillInstagram />
        </Link>
        <Link href="/">
          <AiOutlineTwitter />
        </Link>
      </div>
    </div>
  )
}

export default Footer