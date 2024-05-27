'use client';
import React, { useEffect, useState } from 'react';
import { getSingleInvoice, deleteInvoice, markAsPaid } from '@/utils/actions';
import EditInvoiceForm from '@/components/EditInvoiceForm'
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { InvoiceDraftType, InvoiceType } from '@/utils/types';
  

const SingleInvoicePage = ({params}: { params: {id: string} }) => {
    const [invoice, setInvoice] = useState<InvoiceType | InvoiceDraftType | null>(null);
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [disableBtn, setDisableBtn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();
    const { toast } = useToast()

    useEffect(() =>{
        const getInvoice = async() => {
            const invoice = await getSingleInvoice(params.id);
            setInvoice(invoice);
            setIsLoading(false);
        }
        getInvoice();
    }, [params.id]);

    const handleDelete = async() =>{
        setDisableBtn(true);
        const result = await deleteInvoice(params.id);
        if (result === 'Invoice Successfully Deleted'){
            toast({
                description: result,
            });
            router.push('/invoices')
        }else if (result === "An error occurred"){
            toast({
                description: result,
            });
            router.push('/invoices')
        }

        setDisableBtn(false);
    };

    const handleMarkAsPaid = async() =>{
        setDisableBtn(true);
        const result = await markAsPaid(params.id);

        if (result.msg === 'Successfully marked as paid'){
            toast({
                description: result.msg,
            });
            setInvoice(result.invoice);
        }else if (result.msg === 'An error occurred'){
            toast({
                description: result.msg,
            });
            setInvoice(result.invoice);
        }

        setDisableBtn(false);
    };

    if (invoice === null) {
        return(
            <Card className='mt-20 border-none rounded-none'><CardTitle className='text-center'>No Invoice found</CardTitle></Card>
        )
    }
  return (
    <div className='mt-10 mb-12 md:w-10/12 lg:w-9/12 w-full h-full block ml-auto mr-auto relative'>
        { showEditForm ? <div><EditInvoiceForm invoice={invoice} setShowEditForm={setShowEditForm} setInvoice={setInvoice}/></div> : null }
        <Button asChild><Link href='/invoices'>Back</Link></Button>
        {isLoading ? (
            <Card className='mt-20 border-none rounded-none'><CardTitle className='text-center'>Loading Invoice...</CardTitle></Card>
        ) :
        (   <>
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
                            <Button variant='outline' className='md:w-3/12 ml-6 mr-4 rounded-3xl' onClick={() => setShowEditForm(true)} disabled={disableBtn}>
                               { disableBtn ? 'Loading...' : 'Edit'} 
                            </Button>
                            // <Button variant='outline' className='md:w-3/12 ml-6 mr-4 rounded-3xl' asChild><Link href={`/invoices/${params.id}/edit`}>Edit</Link></Button>
                        ) : null}
                        <Button onClick={handleDelete} variant='destructive' className='md:w-3/12 ml-4 md:ml-0 mr-4 rounded-3xl' disabled={disableBtn}>
                        { disableBtn ? 'Loading...' : 'Delete'} 
                        </Button>
                        {invoice?.status === 'pending' ? (
                            <Button onClick={handleMarkAsPaid} className='md:w-4/12 mr-4 bg-green-600 hover:bg-green-400 rounded-3xl'
                                disabled={disableBtn}
                            >
                              { disableBtn ? 'Loading...' : 'Mark as paid'}  
                            </Button>
                        ) : null}
                    </div>
                </Card>
                <Card className='w-full rounded-none md:rounded-md h-fit mt-4 mb-10 py-4 px-5 bg-muted'>
                <p className='text-3xl font-medium mb-5'>{invoice?.senderName}</p>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <div className='h-fit w-full md:w-6/12'>
                            <div className='float-left'>
                                <p className='text-2xl font-semibold'>INV#{invoice?.invoiceNumber}</p>
                                <p className='text-2xl font-semibold'>Balance due: {invoice?.curr?.split(' ')[1]} {invoice?.totalAmount}</p>
                                {/* <p className='text-xl font-medium'>{invoice?.senderName}</p> */}
                            </div>
                        </div>
                        <div className='h-fit w-full md:w-6/12 lg:text-xl'>
                            <div className='md:float-right'>
                                <p className='text-xl font-semibold'>Ship To:</p>
                                <p className='text-xl font-medium'>{invoice?.senderName}</p>
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
                            <p className='text-xl font-semibold'>Bill To:</p>
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
                    <p className='text-xl font-semibold mt-4'>Project Description:</p>
                    <p className=''>{invoice?.description}</p>
                    {invoice?.others ? (
                        <>
                            <p className='text-xl font-semibold mt-4'>Additional information:</p>
                            <p className=''>{invoice?.others}</p>
                        </>
                    ) : null}
                    
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
                    {invoice?.itemLists?.map((item: string, i: number) =>{
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
                    <p className='pl-2 font-semibold text-2xl text-center'>Total amount: {invoice?.curr?.split(' ')[1]} {invoice?.totalAmount}</p>
                    <p className='ml-2 text-xl font-semibold mt-4'>Terms:</p>
                    <p className='ml-2'>{invoice?.paymentTerm}</p>
                </Card>
            </>
        )}
    </div>
  )
}

export default SingleInvoicePage;