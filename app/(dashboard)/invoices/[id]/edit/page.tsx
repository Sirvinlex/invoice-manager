'use client'
import { getAllInvoice } from '@/utils/actions';
import React, { useState, useEffect } from 'react';
import EditInvoiceForm from '@/components/EditInvoiceForm'

const page = ({params}: { params: {id: string} }) => {
  const [invoice, setInvoice] = useState<any | null>(null);
   const tempInvoice = {
    "id": "66422ae2411c736a7096a321",
    "clerkId": "122939292",
    "invoiceNumber": "2",
    "street": "federal housing authority lugbe",
    "city": "Abuja",
    "postCode": "900109",
    "country": "Nigeria",
    "name": "Vincent Alexander",
    "senderName": "Vincent Alexander",
    "email": "alexander.vincentchinonso@gmail.com",
    "clientStreet": "federal housing authority lugbe",
    "clientCity": "Abuja",
    "clientPostCode": "900109",
    "clientCountry": "Nigeria",
    "invoiceDate": "2/5/2024",
    "dueDate": "2/6/2024",
    "paymentTerm": "payment terms",
    "description": "description",
    "others": "other",
    "totalAmount": "12",
    "curr": "₦",
    "createdAt": "2024-05-13T14:59:46.897Z",
    "status": "pending",
    "itemLists": [
        "item1,1,2,2",
        "first,2,2,4",
        "seminar,3,2,6"
    ]
}
    useEffect(() =>{
        const getInvoice = async() => {
            const invoice = await getAllInvoice(params.id);
            setInvoice(invoice);
        }
        getInvoice();
    }, [params.id]);

  return (
    <div className='lg:px-32 md:px-16 pt-16'>
        <EditInvoiceForm invoice={tempInvoice}/>
        {/* <EditInvoiceForm invoice={invoice}/> */}
    </div>
  )
}

export default page