import React, { useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { InvoiceDraftType, InvoiceType } from '@/utils/types';

const PrintContents = ({ invoice }: { invoice: InvoiceType | InvoiceDraftType}) => {
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
  return (
    <div>
        <button className='ml-4 lg:ml-8 flex' onClick={() => {
            handlePrint(null, () => contentToPrint.current);
        }}>
        <span className='mt-2 mr-2 font-medium'>Print</span> <Download className='mt-1'/>
        </button>
        <div className='hidden'>
            <div ref={contentToPrint} className='w-full rounded-md h-fit mt-4 mb-10 py-4 px-5'>
                <p className='text-3xl font-medium mb-5'>{invoice?.senderName}</p>
                    <div className='flex-row flex justify-between'>
                        <div className='h-fit w-6/12'>
                            <div className='float-left'>
                                <p className='text-2xl font-semibold'>Balance due: {invoice?.curr?.split(' ')[1]} {invoice?.totalAmount}</p>
                                {/* <p className='text-xl font-medium'>{invoice?.senderName}</p> */}
                            </div>
                        </div>
                        <div className='h-fit w-6/12 text-xl'>
                            <div className='float-right'>
                                <p className='text-xl font-semibold'>Ship To:</p>
                                <p className='text-xl font-medium'>{invoice?.senderName}</p>
                                <p>{invoice?.street}</p>
                                <p>Post-code: {invoice?.postCode}</p>
                                <p>{invoice?.city}</p>
                                <p>{invoice?.country}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between my-5'>
                        <div className='mb-4 w-4/12'>
                            <p className='text-xl font-semibold'>Invoice Time</p>
                            <p>{invoice?.invoiceDate}</p>
                            <p className='text-xl mt-4 font-semibold'>Payment Time</p>
                            <p>{invoice?.dueDate}</p>
                        </div>
                        <div className='mb-4 w-4/12'>
                            <p className='text-xl font-semibold'>Bill To:</p>
                            <p className='capitalize'>{invoice?.name}</p>
                            <p>{invoice?.clientStreet}</p>
                            <p>Post-code: {invoice?.clientPostCode}</p>
                            <p>{invoice?.clientCity}</p>
                            <p>{invoice?.clientCountry}</p>
                        </div>
                        <div className='mb-4 w-4/12'>
                            <p className='text-xl font-semibold'>Client Email Address</p>
                            <p>{invoice?.email}</p>
                        </div>
                    </div>
                    <p className='text-xl font-semibold mt-4'>Project Description:</p>
                    <p className=''>{invoice?.description}</p>
                    {invoice?.others ? (
                        <>
                            <p className='text-xl font-semibold mt-4'>Additional information:</p>
                            <p className=''>{invoice?.others}</p>
                        </>
                    ) : null}
                    
                    <div className='text-card items-center pl-2 flex justify-between w-full h-11 bg-primary rounded mt-7'>
                        <div className='flex justify-between my-4 w-full'>
                        <div className='block w-6/12'>Item Name</div>  
                        {/* <div className='w-full lg:hidden text-center'>Lists of Items</div>   */}
                        <div className='w-6/12 flex justify-between'>
                            <div className='pl-3 w-4/12'>Quantity</div>  
                            <div className='w-4/12'>Price</div>
                            <div className='w-3/12'>Total</div>
                        </div>
                        </div>
                    </div>
                    {invoice?.itemLists?.map((item: string, i: number) =>{
                        return (
                            <div key={i} className='items-center pl-2 flex justify-between w-full rounded'>
                                <div className='flex justify-between flex-row my-4 w-full'>
                                <div className='block w-6/12'>{item.split(',')[0]}</div> 
                                <div className='hidden text-xs w-6/12'>{item.split(',')[0]}</div> 
                                <div className='w-6/12 flex justify-between'>
                                    <div className='pl-3 w-4/12'>{item.split(',')[1]}</div>  
                                    <div className='w-4/12 ml-2'>{item.split(',')[2]}</div>
                                    <div className='w-3/12'>{item.split(',')[3]}</div>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                    <p className='pl-2 font-semibold text-2xl text-center'>Total amount: {invoice?.curr?.split(' ')[1]} {invoice?.totalAmount}</p>
                    <p className='ml-2 text-xl font-semibold mt-4'>Terms:</p>
                    <p className='ml-2'>{invoice?.paymentTerm}</p>
                </div>
        </div>
    </div>
  )
}

export default PrintContents