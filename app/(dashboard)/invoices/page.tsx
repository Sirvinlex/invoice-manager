'use client';
import React, { useEffect, useState } from 'react';
import { getAllInvoices } from '@/utils/actions';
import { CircleArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardTitle, } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InvoiceDraftType, InvoiceStatus, InvoiceType, getAllInvoicesType } from '@/utils/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PageButton from '@/components/PageButton';



const Invoices = () => {
  const searchParams = useSearchParams();

  const invoiceSearch = searchParams.get('search') || '';
  const invoiceStatus = searchParams.get('status') || 'all';
  const pageNumber = Number(searchParams.get('page')) || 1;

  const [invoices, setInvoices] = useState<(InvoiceType | InvoiceDraftType)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>(invoiceSearch);
  const [status, setStatus] = useState<string>(invoiceStatus);
  const [page, setPage] = useState<number>(pageNumber);
  const [invoiceCount, setInvoiceCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() =>{
    setPage(1);
  }, [search, status]);
  
  useEffect(() =>{
    setIsLoading(true);

    let params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status !== 'all') params.set('status', status);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);

    async function getInvoices (){
      const getInvoicesData: getAllInvoicesType = { search, invoiceStatus: status, page, limit: 10}
      const data = await getAllInvoices(getInvoicesData);
      setInvoices(data.invoices);
      setInvoiceCount(data.count);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    };
    getInvoices();
    
  }, [search, status, page]);

  const handleClick = () =>{
    setSearch('');
  };
  
  return (
    <>
      <div className='mt-10 mb-12 md:px-6 py-16 md:w-full lg:w-10/12 w-full h-screen block ml-auto mr-auto'>
        <div className='bg-card flex flex-col md:flex-row justify-between mb-12 lg:px-0 px-3'>
          <div className='w-full md:w-7/12  flex justify-around mr-8 '>
            <div className='w-5/12'>
              <p className='text-4xl lg:text-5xl'>Invoices</p> 
              <p className='text-xs'>There {invoiceCount > 1 ? 'are' : 'is'} total of {invoiceCount} {invoiceCount > 1 ? 'invoices' : 'invoice'}</p>
            </div>
            <div className="relative w-6/12 mt-2 hidden md:block"> 
              <Input className={search ? 'w-full mb-6 pr-9 py-2' : 'w-full mb-6 pr-0 py-2'} type='text' name='search' id='search' 
                placeholder='Search clients or project descriptions'
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
              {search ? (
                <div className="absolute inset-y-0 right-0 pl-3 flex items-center"> 
                  <Button onClick={handleClick} variant='ghost' className='mb-6 w-10 p-0'><X /></Button>
              </div>
              ) : null} 
            </div>
            <Button className='w-5/12 text-center mt-2 block md:hidden' asChild><Link href='/create-invoice'>New Invoice</Link></Button>
          </div>
          <div className='w-full md:w-5/12 flex justify-between mt-4 md:mt-0 '>
          <div className="relative w-5/12 mt-2 block md:hidden"> 
              <Input className={search ? 'w-full mb-6 pr-9 py-2' : 'w-full mb-6 pr-0 py-2'} type='text' name='search' id='search' 
                placeholder='Case Sensitive Search clients or project descriptions'
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
              {search ? (
                <div className="absolute inset-y-0 right-0 pl-3 flex items-center"> 
                  <Button onClick={handleClick} variant='ghost' className='mb-6 w-10 p-0'><X /></Button>
                </div>
              ) : null} 
            </div>
            <select
              id='status-select'
              style={{borderWidth:'1px'}}
              className='w-6/12 md:w-5/12 mt-2 bg-card rounded-md h-10 pl-1'
              value={status} 
              onChange={e => setStatus(e.target.value)}   
            >
              {Object.values(InvoiceStatus).map((item, i) =>{
                return(
                  <option key={i} value={item} >{item}</option>
                )
              })}
            </select>
            <Button className='hidden text-center md:block w-5/12 mt-2 md:mt--0 lg:mt-2' asChild><Link href='/create-invoice'>New Invoice</Link></Button>
          </div>
        </div>
        <div>
          {isLoading ? (
            <Card className='mt-20 border-none rounded-none'><CardTitle className='text-center'>Loading Invoices...</CardTitle></Card>
          ) :
          (
            <>
              {invoices?.length < 1 ? (
                <>
                  {search || status !== 'all' ? (
                    <Card className='mt-20 border-none rounded-none'><CardTitle className='text-center'>No result matched your query</CardTitle></Card>
                  ) : (
                    <Card className='mt-20 border-none rounded-none'><CardTitle className='text-center'>You don't have any invoice yet</CardTitle></Card>
                  )}
                </>
              ) : null}
              {totalPages > 1 ? (
                <PageButton totalPages={totalPages} page={page} setPage={setPage} />
               ) : null} 
              {invoices.map((invoice, i) =>{
                return (
                  <Link key={i} href={`/invoices/${invoice.id}`}>
                      <Card  className='bg-muted flex flex-col md:flex-row items-center justify-between md:h-14 mb-3'>
                      <div className='flex items-center justify-between pt-5 w-full md:w-7/12 pr-2 relative'>
                        <CircleArrowRight size={20} className='float-right mr-2 md:hidden absolute right-3 top-1' />
                        <CardContent className='font-semibold md:w-2/12'># {invoice.invoiceNumber}</CardContent>
                        <CardContent className='md:w-4/12'>Due {invoice.dueDate}</CardContent>
                        <CardContent className='text-xl capitalize md:w-6/12'>{invoice?.name?.split(' ')[0]}</CardContent>
                      </div>
                      <div className='flex items-center justify-between pt-5 w-full md:w-5/12 md:pl-2 pr-3'>
                        <CardContent className='md:w-7/12 font-semibold text-xl'>{invoice?.curr?.split(' ')[1]} {invoice.totalAmount}</CardContent>
                        <CardContent className={invoice.status === 'pending' ? 'text-yellow-500 md:w-3/12' : invoice.status === 'paid' ? 'text-green-500 md:w-3/12' : 'pt-0 md:w-3/12'}>
                          {invoice.status}
                        </CardContent>
                        <div className='hidden md:block mb-5 md:w-2/12 '><CircleArrowRight className='float-right mr-2' /></div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Invoices