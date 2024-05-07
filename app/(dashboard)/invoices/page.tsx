'use client'
import React, { useEffect, useState } from 'react';
import { getAllInvoices } from '@/utils/actions';

const Invoices = () => {
  // const [invoices, setInvoices] = useState([]);

  useEffect(() =>{
    const invoices = getAllInvoices();
    console.log(invoices)
  }, [])
  
  return (
    <div className='pt-10'>Invoices</div>
  )
}

export default Invoices