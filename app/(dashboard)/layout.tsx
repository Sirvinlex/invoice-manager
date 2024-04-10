import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { PropsWithChildren } from "react";

import React from 'react'

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="h-screen flex">
        <div className="hidden lg:block w-1/12">
          <SideBar/>
        </div>
        <div className="lg:w-11/12 w-full">
          <div className="lg:hidden block">
              <Navbar/>
          </div>
          {children}
        </div>
    </main>
    // <main className="h-screen grid lg:grid-cols-12">
    //     <div className="hidden lg:block lg:col-span-1">
    //         <SideBar/>
    //     </div>
    //     <div className="lg:hidden block lg:col-span-11">
    //         <Navbar/>
    //         {children}
    //     </div>
    // </main>
  )
}

export default layout;