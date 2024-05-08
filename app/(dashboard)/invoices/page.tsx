'use client'
import React, { useEffect, useState } from 'react';
import { getAllInvoices } from '@/utils/actions';
import { CircleArrowRight } from 'lucide-react';
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
  
  return (
    <>
      <div className='mt-10 mb-12 px-6 py-16 md:w-10/12 lg:w-9/12 w-full h-screen block ml-auto mr-auto'>
        {invoices.map((invoice, i) =>{
          return (
            <Card key={i} className='bg-muted flex items-center justify-between h-14 pt-5 mb-3'>
              <CardContent className='font-semibold text-white'># {invoice.invoiceNumber}</CardContent>
              <CardContent>Due {invoice.dueDate}</CardContent>
              <CardContent className='text-xl'>{invoice.name.split(' ')[0]}</CardContent>
              <CardContent className='font-semibold text-2xl'>{invoice.curr} {invoice.totalAmount}</CardContent>
              <CardContent className={invoice.status === 'pending' ? 'text-yellow-500' : invoice.status === 'paid' ? 'text-green-500' : 'text-slate-300'}>
                {invoice.status}
              </CardContent>
              <div className='mr-3 mb-5'><CircleArrowRight /></div>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default Invoices