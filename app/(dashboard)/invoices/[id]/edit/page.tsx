'use client'
import { getAllInvoice } from '@/utils/actions';
import React, { useState, useEffect } from 'react';
import EditInvoiceForm from '@/components/EditInvoiceForm'

const page = ({params}: { params: {id: string} }) => {
  const [invoice, setInvoice] = useState<any | null>(null);

    useEffect(() =>{
        const getInvoice = async() => {
            const invoice = await getAllInvoice(params.id);
            setInvoice(invoice);
        }
        getInvoice();
    }, [params.id]);

  return (
    <div>
        <EditInvoiceForm invoice={invoice}/>
    </div>
  )
}

export default page