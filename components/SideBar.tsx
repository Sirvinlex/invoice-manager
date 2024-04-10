import React from 'react';
import { UserButton } from '@clerk/nextjs';

const SideBar = () => {
  return (
    <aside className='bg-muted items-center flex flex-col justify-between h-full w-full'>
      <div>
        logo
      </div>
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