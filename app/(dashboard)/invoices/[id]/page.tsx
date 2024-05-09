import React from 'react';
import { getAllInvoice } from '@/utils/actions';

const SingleInvoicePage = async({params}: { params: {id: string} }) => {
    const invoice = await getAllInvoice(params.id);
  return (
    <div>{invoice.invoiceNumber}</div>
  )
}

export default SingleInvoicePage;