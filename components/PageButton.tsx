'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Ellipsis } from 'lucide-react';
const PageButton = ({totalPages, currentPage, setPage}: {totalPages: number, currentPage: number, setPage: any}) => {

//   useEffect(() =>{
//     const btnArr: any = [];
//     let count = 0;
//     while (count < totalPages){
//         btnArr.push([<Button variant={currentPage === count + 1 ? 'outline' : 'default'} className='w-4 h-8 bg'>{count + 1}</Button>, count + 1])
//         count = count + 1;
//     };
//     setPageButtons(btnArr);
// }, []);

    const pageButtons: any = [];
    let count = 0;
    while (count < totalPages){
      pageButtons.push([<Button variant={currentPage === count + 1 ? 'outline' : 'default'} className='w-4 h-8 bg'>{count + 1}</Button>, count + 1])
        count = count + 1;
    };

    // const [pageButtons, setPageButtons] = useState<any[]>([1, 1]);
    // const [pageNumber, setPageNumber] = useState<number>(1);
    const [displayedPageButtons, setDisplayedPageButtons] = useState<any[]>(pageButtons.slice(0, 5));
    
    // let displayedPageButtons = pageButtons.slice(0, 5)


    const handleClick = (item: any, i: number) =>{
      let tempDisplayBtn: any
      if (item[1] === displayedPageButtons[0][1]){
        console.log('yes')
      };

      if (item[1] === displayedPageButtons[displayedPageButtons.length -1][1] && 
        displayedPageButtons[displayedPageButtons.length -1][1] !== pageButtons[pageButtons.length - 1][1]){
        console.log(i, 'yes')
        // displayedPageButtons = pageButtons.slice(i, i + 6)
        tempDisplayBtn = pageButtons.slice(i, i + 5);
      };
      setPage((prevState: number) => i + 1);
      console.log(tempDisplayBtn.length, 'length')
      setDisplayedPageButtons((prevState: any) => tempDisplayBtn);
    };

  return (
    <div className='flex flex-wrap mb-2'>
      <Button onClick={() => setPage((prevState: number) => prevState === 1 ? totalPages : prevState - 1)} 
        className='w-16 h-8 mr-1 pr-3 pl-1 py-0'
      >
        <ChevronLeft /> Prev
      </Button>
      {displayedPageButtons[0][1] !== pageButtons[0][1] ? <Ellipsis className='pt-2'/> : null}
      {displayedPageButtons.map((item: any, i: number) => <div onClick={() => handleClick(item, i)}  className='mr-1' key={i}>{item[0]}</div> )}
      {displayedPageButtons[displayedPageButtons.length -1][1] !== pageButtons[pageButtons.length - 1][1] ? <Ellipsis className='pt-2'/> : null}
      <Button onClick={() => setPage((prevState: number) => prevState === totalPages ? 1 : prevState + 1)} 
        className='w-16 h-8 py-0 pr-1 pl-3'
      >
        Next <ChevronRight />
      </Button>
    </div>
  )
}

export default PageButton


