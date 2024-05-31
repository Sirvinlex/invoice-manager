'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Ellipsis } from 'lucide-react';
const PageButton = (
  {totalPages, page, setPage,}: {
    totalPages: number, page: number, setPage: React.Dispatch<React.SetStateAction<number>>
  }
) => {
  
  const searchParams = useSearchParams();

    const pageButtons: (React.ReactNode | number)[][] = [];
    let count = 0;
    while (count < totalPages){
      pageButtons.push([<Button variant={page === count + 1 ? 'outline' : 'default'} className='w-4 h-8 bg'>{count + 1}</Button>, count + 1])
        count = count + 1;
    };

    const pageButtons2: (React.ReactNode | number)[][] = pageButtons.slice(0);
    const firstButton: (React.ReactNode | number)[][] = pageButtons.splice(0, 1,);
    const lastButton: (React.ReactNode | number)[][] = pageButtons.splice(pageButtons.length - 1, 1,);

    const handleFirstBtnClick = () =>{
      setPage(1)
    };
    const handleLastBtnCLick = () =>{
      setPage(totalPages);
    };

    if (totalPages <= 5) {
      return (
        <div className='flex flex-wrap mb-2'>
          <Button onClick={() => {
            page === 1 ? setPage(totalPages) : setPage((prevState: number) => prevState - 1);
          }} 
            className='w-16 h-8 mr-1 pr-3 pl-1 py-0 mb-2'
          >
            <ChevronLeft /> Prev
          </Button>
          {pageButtons2.map((item: any, i: number) => {
          return (
            <div 
            className='mr-1' 
            onClick={() => setPage(item[1])} key={i}>
              {item[0]}
            </div>
          )
          } )}
          <Button onClick={() => {
            page === totalPages ? setPage(1) : setPage((prevState: number) => prevState + 1)
          }} 
            className='w-16 h-8 py-0 pr-1 pl-3'
          >
            Next <ChevronRight />
          </Button>
        </div>
      )
    }
  else return (
    <div className='flex flex-wrap mb-2'>
      <Button onClick={() => {
        page === 1 ? setPage(totalPages) : setPage((prevState: number) => prevState - 1);
      }} 
        className='w-16 h-8 mr-1 pr-3 pl-1 py-0'
      >
        <ChevronLeft /> Prev
      </Button>
      <div onClick={handleFirstBtnClick} className='mr-1'>{firstButton[0][0]}</div>      
      {
        page === 1 ? (
          <>
            <div className='flex'>{pageButtons.slice(0, 5).map((item: any, i: number) => {
              return (
                <div 
                className='mr-1' 
                onClick={() => setPage(item[1])} key={i}>
                  {item[0]}
                </div>
              )
            } )}
            </div>
            {pageButtons.length > 5 ? <Ellipsis className='pt-2 mr-1'/> : null}
          </> 
        ) : page === totalPages ? (
          <>
            {pageButtons.length > 5 ? <Ellipsis className='pt-2 mr-1'/> : null}
            <div className='flex'>{pageButtons.slice(-5).map((item: any, i: number) => {
              return (
                <div 
                className='mr-1' 
                onClick={() => setPage(item[1])} key={i}>
                  {item[0]}
                </div>
              )
            } )}
            </div>
            
          </> 
        ) : (
          <>
            {page - 2 > 2 ? <Ellipsis className='pt-2'/> : null}
            <div className='flex'>{pageButtons.map((item: any, i: number) => {
              return (
                <div 
                  className={page - 4 === i || page - 3 === i || page - 2 === i || page - 1 === i || page === i ? 'mr-1 block' : 'mr-1 hidden'} 
                  onClick={() => setPage(i + 2)} key={i}>
                    {item[0]}
                  </div>
              )
              } )}
              </div>
            
            {page - 2 <= pageButtons.length - 4 ? <Ellipsis className='pt-2 mr-1'/> : null}
          </>
        )
      }
      
      <div onClick={handleLastBtnCLick} className='mr-1'>{lastButton[0][0]}</div>
      <Button onClick={() => {
        page === totalPages ? setPage(1) : setPage((prevState: number) => prevState + 1)
      }} 
        className='w-16 h-8 py-0 pr-1 pl-3'
      >
        Next <ChevronRight />
      </Button>
    </div>
  )
}

export default PageButton


