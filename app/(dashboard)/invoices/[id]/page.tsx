'use client'
import React, { useEffect, useState } from 'react';
import { getAllInvoice, deleteInvoice, markAsPaid } from '@/utils/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const SingleInvoicePage = ({params}: { params: {id: string} }) => {
    const [invoice, setInvoice] = useState<any | null>(null);

    const tempArr = [['item1', 2, 5, 10], ['item2', 3, 5, 15], ['item3', 1, 5, 5]]
    useEffect(() =>{
        const getInvoice = async() => {
            const invoice = await getAllInvoice(params.id);
            setInvoice(invoice);
        }
        getInvoice();
    }, [params.id]);

    const handleDelete = async() =>{
        await deleteInvoice(params.id);
        redirect('/invoices')
    };

    const handleMarkAsPaid = async() =>{
        await markAsPaid(params.id);
    };
  return (
    <div className='mt-10 mb-12 md:w-10/12 lg:w-9/12 w-full h-full block ml-auto mr-auto'>
        <Button asChild><Link href='/invoices'>Back</Link></Button>
        <Card className='flex flex-col md:flex-row rounded-none md:rounded-md h-32 md:h-16 bg-muted w-full mt-4'>
            <div className='flex md:w-6/12 pt-4'>
                <CardContent className='font-semibold text-2xl'>
                    Status: <span className={invoice?.status === 'pending' ? 'text-yellow-500 font-medium' : invoice?.status === 'paid' ? 'text-green-500 font-medium' : 'font-medium'}>
                                {invoice?.status}
                            </span>
                </CardContent>
            </div>
            <div className='md:w-6/12 flex md:pt-3'>
                {invoice?.status !== 'paid' ? (
                    <Button variant='outline' className='md:w-3/12 ml-6 mr-4 rounded-3xl'>Edit</Button>
                ) : null}
                <Button onClick={handleDelete} variant='destructive' className='md:w-3/12 ml-4 md:ml-0 mr-4 rounded-3xl'>Delete</Button>
                {invoice?.status === 'pending' ? (
                    <Button onClick={handleMarkAsPaid} className='md:w-4/12 mr-4 bg-green-600 hover:bg-green-400 rounded-3xl'>Mark as paid</Button>
                ) : null}
            </div>
        </Card>
        <Card className='w-full rounded-none md:rounded-md h-fit mt-4 mb-10 py-4 px-5 bg-muted'>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='h-fit w-full md:w-6/12'>
                    <div className='float-left'>
                        <p className='text-2xl font-semibold'>INV#{invoice?.invoiceNumber}</p>
                        <p className='text-xl font-medium'>{invoice?.senderName}</p>
                    </div>
                </div>
                <div className='h-fit w-full md:w-6/12 lg:text-xl'>
                    <div className='md:float-right'>
                        <p>{invoice?.street}</p>
                        <p>Post-code: {invoice?.postCode}</p>
                        <p>{invoice?.city}</p>
                        <p>{invoice?.country}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-between my-5'>
                <div className='w-full mb-4 md:w-4/12'>
                    <p className='text-xl font-semibold'>Invoice Time</p>
                    <p>{invoice?.invoiceDate}</p>
                    <p className='text-xl mt-4 font-semibold'>Payment Time</p>
                    <p>{invoice?.dueDate}</p>
                </div>
                <div className='w-full mb-4 md:w-4/12'>
                    <p className='text-xl font-semibold'>Bill To</p>
                    <p>{invoice?.clientStreet}</p>
                    <p>Post-code: {invoice?.clientPostCode}</p>
                    <p>{invoice?.clientCity}</p>
                    <p>{invoice?.clientCountry}</p>
                </div>
                <div className='w-full mb-4 md:w-4/12'>
                    <p className='text-xl font-semibold'>Client Email Address</p>
                    <p>{invoice?.email}</p>
                </div>
            </div>

            <div className='text-white items-center pl-2 flex justify-between w-full h-11 bg-primary rounded mt-7'>
                <div className='flex justify-between my-4 w-full'>
                <div className='hidden lg:block lg:w-6/12'>Item Name</div>  
                {/* <div className='w-full lg:hidden text-center'>Lists of Items</div>   */}
                <div className='w-full lg:w-6/12 flex justify-between'>
                    <div className='pl-3 lg:w-4/12'>Quantity</div>  
                    <div className='w-4/12'>Price</div>
                    <div className='w-3/12'>Total</div>
                </div>
                </div>
            </div>
            {invoice?.itemLists.map((item: any, i: string) =>{
                return (
                    <div key={i} className='items-center pl-2 flex justify-between w-full rounded'>
                        <div className='flex justify-between flex-col lg:flex-row my-4 w-full'>
                        <div className='hidden lg:block w-full lg:w-6/12'>{item.split(',')[0]}</div> 
                        <div className='lg:hidden text-xs block w-full lg:w-6/12'>{item.split(',')[0]}</div> 
                        <div className='lg:w-6/12 w-full flex justify-between'>
                            <div className='pl-3 lg:w-4/12'>{item.split(',')[1]}</div>  
                            <div className='w-4/12 ml-12 lg:ml-2'>{item.split(',')[2]}</div>
                            <div className='w-3/12'>{item.split(',')[3]}</div>
                        </div>
                        </div>
                    </div>
                )
            })}
        </Card>
    </div>
  )
}

export default SingleInvoicePage;