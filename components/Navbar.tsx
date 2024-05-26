import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Logo from '../assets/log2.webp'
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className='h-16 bg-muted flex items-center justify-between px-6 sm:px-12'>
      <Image className="w-10 h-10 rounded-xl" src={Logo} alt='logo' />
      <div className='flex items-center gap-x-4 sm:gap-x-9 justify-between'>
        <div>
          thIcon
        </div>
        <UserButton/>
      </div>
    </nav>
  )
}

export default Navbar;