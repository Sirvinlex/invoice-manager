'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getAllInvoices } from '@/utils/actions';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Ellipsis } from 'lucide-react';
import { InvoiceStatus, getAllInvoicesType } from '@/utils/types';
const PageButton = (
  {totalPages, page, setPage, setInvoices, setIsLoading, setInvoiceCount, setTotalPages, status, search}: {
    totalPages: number, page: number, setInvoices: any, setIsLoading: any, setInvoiceCount: any, setTotalPages: any, status: string, 
    search: string, setPage: any
  }
) => {
  
  const searchParams = useSearchParams();

// const [page, setPage] = useState<number>(1);
    const pageButtons: any = [];
    let count = 0;
    while (count < totalPages){
      pageButtons.push([<Button variant={page === count + 1 ? 'outline' : 'default'} className='w-4 h-8 bg'>{count + 1}</Button>, count + 1])
        count = count + 1;
    };

    const pageButtons2 = pageButtons.slice(0);
    const firstButton = pageButtons.splice(0, 1,);
    const lastButton = pageButtons.splice(pageButtons.length - 1, 1,);

    // const pageNumber = Number(searchParams.get('page')) || 1;

    // const [pageButtons, setPageButtons] = useState<any[]>([1, 1]);
    // const [placeholder, setPlaceholder] = useState<number>(4);
    // const [placeholder2, setPlaceholder2] = useState<number>(4);
    // const [page, setPage] = useState<number>(pageNumber);
    // const [displayedPageButtons, setDisplayedPageButtons] = useState<any[]>(pageButtons.slice(0, 5));
    
    // let displayedPageButtons = pageButtons.slice(0, 5)


    // const handleClick = (item: any, i: number) =>{
    //   // setIsLoading(true);
      
    //   if (item[1] === displayedPageButtons[0][1] && displayedPageButtons[0][1] !== pageButtons[0][1]){
    //     console.log('yes')
    //     let tempDisplayBtn: any;
    //     // tempDisplayBtn = pageButtons.slice(pageButtons.length > 8 ? placeholder - 8, placeholder - 3); ///
    //     setPlaceholder((prevState) => prevState - 4);
    //     setDisplayedPageButtons((prevState: any) => tempDisplayBtn);
    //   };

    //   if (item[1] === displayedPageButtons[displayedPageButtons.length -1][1] && (
    //     displayedPageButtons[displayedPageButtons.length -1][1] !== pageButtons[pageButtons.length - 1][1] 
    //     // ||displayedPageButtons[displayedPageButtons.length -1][1] !== pageButtons[pageButtons.length - 2][1]
    //   )){
    //     console.log(i, 'yes')
    //     let tempDisplayBtn: any;
    //     // displayedPageButtons = pageButtons.slice(i, i + 6)
    //     tempDisplayBtn = pageButtons.slice(placeholder, placeholder + 5);
    //     setPlaceholder((prevState) => prevState + 4);
    //     setDisplayedPageButtons((prevState: any) => tempDisplayBtn);
    //   };
      
    //   // setPage((prevState: number) => i + 1);
      
    //   // async function getInvoices (){
    //   //   // const getInvoicesData: getAllInvoicesType = { search : '', invoiceStatus : '', page : 1, limit: 10}
    //   //   const getInvoicesData: getAllInvoicesType = { search, invoiceStatus: status, page, limit: 1}
    //   //   const data = await getAllInvoices(getInvoicesData);
    //   //   setInvoices(data.invoices);
    //   //   setInvoiceCount(data.count);
    //   //   setTotalPages(data.totalPages);
    //   //   // setIsLoading(false);
    //   // };
    //   // getInvoices();
      
    // };

    const handleFirstBtnClick = () =>{
      setPage(1)
      // let tempDisplayBtn: any = pageButtons.slice(0, 5);
      // setPlaceholder((prevState) => 4);
      // setDisplayedPageButtons((prevState: any) => tempDisplayBtn);
    };
    const handleLastBtnCLick = () =>{
      setPage(totalPages);
      // let tempDisplayBtn: any = pageButtons.slice(pageButtons.length - 5);
      // setPlaceholder((prevState) => pageButtons.length - 1)
      // setDisplayedPageButtons((prevState: any) => tempDisplayBtn);
    };

    if (totalPages <= 5) {
      return (
        <div className='flex flex-wrap mb-2'>
          <Button onClick={() => {
            page === 1 ? setPage(totalPages) : setPage((prevState: any) => prevState - 1);
          }} 
            className='w-16 h-8 mr-1 pr-3 pl-1 py-0'
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
            page === totalPages ? setPage(1) : setPage((prevState: any) => prevState + 1)
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
        page === 1 ? setPage(totalPages) : setPage((prevState: any) => prevState - 1);
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
        page === totalPages ? setPage(1) : setPage((prevState: any) => prevState + 1)
      }} 
        className='w-16 h-8 py-0 pr-1 pl-3'
      >
        Next <ChevronRight />
      </Button>
    </div>
  )
}

export default PageButton


