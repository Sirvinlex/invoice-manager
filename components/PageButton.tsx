'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const PageButton = ({totalPages, currentPage}: {totalPages: number, currentPage: number}) => {
    const [pageButtons, setPageButtons] = useState<any[]>([]);

    useEffect(() =>{
        const btnArr: any = [];
        let count = 0;
        while (count < totalPages){
            btnArr.push(<Button>{count + 1}</Button>)
            count = count + 1;
        };
        setPageButtons(btnArr);
    }, []);
  return (
    <div className='flex'>{pageButtons.map((item: any, i: number) => <div className='mr-1' key={i}>{item}</div> )}</div>
  )
}

export default PageButton


