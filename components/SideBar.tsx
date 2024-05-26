import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Logo from '../assets/log2.webp'
import Image from "next/image";

      

const SideBar = () => {
  return (
    <aside className='bg-muted items-center flex flex-col justify-between h-full w-full'>
      <Image className="w-10 mt-4 h-10 rounded-xl" src={Logo} alt='logo' />
      <div className='flex items-center flex-col gap-y-4 justify-between'>
        <div>
          thIcon
        </div>
        <UserButton/>
      </div>
    </aside>
  )
}

export default SideBar;