'use client';
import { Toaster } from "@/components/ui/toaster"

import React from 'react';

const provider = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
        <div>{children}</div>
        <Toaster />
    </div>
  )
}

export default provider;