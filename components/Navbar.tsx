import React from 'react';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className='h-16 bg-muted flex items-center justify-between px-6 sm:px-12'>
      <div>
        logo
      </div>
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