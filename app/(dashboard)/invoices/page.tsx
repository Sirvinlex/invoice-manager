'use client'
import React, { useEffect, useState } from 'react';
import { getAllInvoices } from '@/utils/actions';
import { CircleArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Invoices = () => {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() =>{
    async function getInvoices (){
      const invoices = await getAllInvoices();
      setInvoices(invoices);
      console.log(invoices)
    };
    getInvoices();
    
  }, [])
  
  if (invoices.length < 1) return <Card className='mt-10 border-none rounded-none'><CardTitle className='text-center'>You don't have any invoice yet</CardTitle></Card>
  return (
    <>
      <div className='mt-10 mb-12 px-6 py-16 md:w-full lg:w-10/12 w-full h-screen block ml-auto mr-auto'>
        {invoices.map((invoice, i) =>{
          return (
            <Link href={`/invoices/${invoice.id}`}>
                <Card key={i} className='bg-muted flex flex-col md:flex-row items-center justify-between md:h-14 mb-3'>
                <div className='flex items-center justify-between pt-5 w-full md:w-7/12 pr-2 relative'>
                  <CircleArrowRight size={20} className='float-right mr-2 md:hidden absolute right-0 top-1' />
                  <CardContent className='font-semibold md:w-2/12'># {invoice.invoiceNumber}</CardContent>
                  <CardContent className='md:w-4/12'>Due {invoice.dueDate}</CardContent>
                  <CardContent className='text-xl md:w-6/12'>{invoice.name.split(' ')[0]}</CardContent>
                </div>
                <div className='flex items-center justify-between pt-5 w-full md:w-5/12 md:pl-2 pr-3'>
                  <CardContent className='md:w-7/12 font-semibold text-xl'>{invoice.curr} {invoice.totalAmount}</CardContent>
                  <CardContent className={invoice.status === 'pending' ? 'text-yellow-500 md:w-3/12' : invoice.status === 'paid' ? 'text-green-500 md:w-3/12' : 'pt-0 md:w-3/12'}>
                    {invoice.status}
                  </CardContent>
                  <div className='hidden md:block mb-5 md:w-2/12 '><CircleArrowRight className='float-right mr-2' /></div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Invoices