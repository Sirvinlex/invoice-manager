'use server';
import { z } from 'zod';
// import prisma from '@/utils/db';
import prisma from './db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { InvoiceDraftType, InvoiceType, getAllInvoicesType } from './types';
import { Prisma } from '@prisma/client';


// proper clerkId is not being return for some reasons
export const authenticateAndRedirect = (): string =>{
    const { userId } = auth();
    if (!userId) redirect('/')
    return userId;
};

export const getAllInvoices = async ({search, invoiceStatus, page=1, limit=10}: getAllInvoicesType): Promise<{
    invoices: InvoiceType[] | InvoiceDraftType[] | [];
    count: number;
    page: number;
    totalPages: number;
}> =>{
    try {
        // Prisma.JobWhereInput
        let whereClause: any = {
            clerkId: '122939292',
        };

        if (search){
            whereClause = {
                ...whereClause,
               OR:[
                {   name: {
                    contains: search
                }
                },
                {
                    description: {
                        contains: search
                    }
                }
               ]
            }
        };

        if (invoiceStatus && invoiceStatus !== 'all') {
            whereClause = {
              ...whereClause,
              status: invoiceStatus,
            };
        };

        const skip = (page - 1) * limit;

        const invoices: InvoiceType[] = await prisma.invoice.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        const count: number = await prisma.invoice.count({
            where: whereClause,
        });
        const totalPages = Math.ceil(count / limit);
        return { invoices, count, page, totalPages };
    } catch (error) {
        console.log(error);
        return { invoices: [], count : 0, page: 1, totalPages: 0};
    }
};

export const getSingleInvoice = async (id: string): Promise<InvoiceType | InvoiceDraftType | null> =>{
    let invoice = null;

    try {
        invoice = await prisma.invoice.findUnique({
            where:{
                id,
                clerkId: '122939292'
            }
        });
        
    } catch (error) {
        invoice = null
    }
    if(!invoice) redirect('/invoices');
    return invoice;
};
// : Promise<InvoiceType | null>
// : Promise<{ invoice: InvoiceType null, msg: string}>
export const createInvoice = async (formData: any, curr: string): Promise<{ invoice: InvoiceType | null, msg: string}> =>{
    const totalArr = formData.getAll('total');
    const itemArr = formData.getAll('item');
    const quantityArr = formData.getAll('quantity');
    const priceArr = formData.getAll('price');
    
    const itemInputArr = []; 

    let count = 0;
    while (count < totalArr.length){
        itemInputArr.push(`${itemArr[count]},${quantityArr[count]},${priceArr[count]},${totalArr[count]}`)
      count = count + 1;
    };
    
    // const itemInputArrFinal = [...itemInputArr];

    const invoiceNumber = formData.get('invoice');
    const street = formData.get('street');
    const city = formData.get('city');
    const postCode = formData.get('post-code');
    const country = formData.get('country');
    const name = formData.get('name');
    const senderName = formData.get('sender-name');
    const email = formData.get('email');
    const clientStreet = formData.get('client-street');
    const clientCity = formData.get('client-city');
    const clientPostCode = formData.get('client-post-code');
    const clientCountry = formData.get('client-country');
    const invoiceDate = formData.get('invoice-date');
    const dueDate = formData.get('due-date');  
    const paymentTerm = formData.get('payment-term');  
    const description = formData.get('description');  
    const others = formData.get('others');  
    const totalAmount = formData.get('total-amount');

    const userId = authenticateAndRedirect();
    try {
        const invoice = await prisma.invoice.create({
            data: {
                clerkId: '122939292', invoiceNumber, street, city, postCode, country, name, senderName, email, clientStreet, clientCity, clientPostCode, clientCountry, 
                invoiceDate, dueDate, paymentTerm, description, others, totalAmount, curr, itemLists: itemInputArr
            },
        });
        // return invoice
        // const res: InvoiceType = invoice;
        // const ret: { invoice: InvoiceType, msg: string} =  { invoice, msg: "Invoice Successfully Created" };
        return { invoice, msg: "Invoice Successfully Created" };
    } catch (error) {
        console.log(error);
        const invoice = null;
        return { invoice, msg: "An error occurred" };
    }
};
export const createDraft = async (formData: any, curr: string): Promise<{ invoice: InvoiceDraftType | null, msg: string}> =>{
    const totalArr = formData.getAll('total');
    const itemArr = formData.getAll('item');
    const quantityArr = formData.getAll('quantity');
    const priceArr = formData.getAll('price');
    
    const itemInputArr = [];

    let count = 0;
    while (count < totalArr.length){
        itemInputArr.push(`${itemArr[count]},${quantityArr[count]},${priceArr[count]},${totalArr[count]}`)
        count = count + 1;
    };
    
    // const itemInputArrFinal = [...itemInputArr];

    const invoiceNumber = formData.get('invoice');
    const street = formData.get('street');
    const city = formData.get('city');
    const postCode = formData.get('post-code');
    const country = formData.get('country');
    const name = formData.get('name');
    const senderName = formData.get('sender-name');
    const email = formData.get('email');
    const clientStreet = formData.get('client-street');
    const clientCity = formData.get('client-city');
    const clientPostCode = formData.get('client-post-code');
    const clientCountry = formData.get('client-country');
    const invoiceDate = formData.get('invoice-date');
    const dueDate = formData.get('due-date');  
    const paymentTerm = formData.get('payment-term');  
    const description = formData.get('description');  
    const others = formData.get('others');  
    const totalAmount = formData.get('total-amount');
    const status = 'draft';

    try {
        const invoice = await prisma.invoice.create({
            data: {
                clerkId: '122939292', invoiceNumber, street, city, postCode, country, name, senderName, email, clientStreet, clientCity, clientPostCode, clientCountry, 
                invoiceDate, dueDate, paymentTerm, description, others, totalAmount, curr, status, itemLists: itemInputArr
            },
        });
        
        // return invoice;
        return { invoice, msg: "Saved as draft" };
    } catch (error) {
        console.log(error);
        const invoice = null;
        // return null;
        return { invoice, msg: "An error occurred" };
    }
    
};

export const deleteInvoice = async (id: string): Promise<string> =>{
    try {
        await prisma.invoice.delete({
            where: {
              id,
              clerkId: '122939292'
            },
        });

        return 'Invoice Successfully Deleted';
    } catch (error) {
        console.log(error);
        return "An error occurred";
    }
};

export const markAsPaid = async (id: string): Promise<string> =>{
    try {
        await prisma.invoice.update({
            where: {
                id,
                clerkId: '122939292'
            },
            data: {
              status: 'paid',
            },
          })
        
          return 'Successfully marked as paid'
    } catch (error) {
        console.log(error);
        return 'An error occurred';
    }
};
export const editInvoice = async (formData: any, curr: string, id: string, status: string): Promise<{ invoice: InvoiceType | InvoiceDraftType | null, msg: string}> =>{
    const totalArr = formData.getAll('total');
    const itemArr = formData.getAll('item');
    const quantityArr = formData.getAll('quantity');
    const priceArr = formData.getAll('price');
    
    const itemInputArr = []; 

    let count = 0;
    while (count < totalArr.length){
        itemInputArr.push(`${itemArr[count]},${quantityArr[count]},${priceArr[count]},${totalArr[count]}`)
      count = count + 1;
    };
    
    // const itemInputArrFinal = [...itemInputArr];

    const invoiceNumber = formData.get('invoice');
    const street = formData.get('street');
    const city = formData.get('city');
    const postCode = formData.get('post-code');
    const country = formData.get('country');
    const name = formData.get('name');
    const senderName = formData.get('sender-name');
    const email = formData.get('email');
    const clientStreet = formData.get('client-street');
    const clientCity = formData.get('client-city');
    const clientPostCode = formData.get('client-post-code');
    const clientCountry = formData.get('client-country');
    const invoiceDate = formData.get('invoice-date');
    const dueDate = formData.get('due-date');  
    const paymentTerm = formData.get('payment-term');  
    const description = formData.get('description');  
    const others = formData.get('others');  
    const totalAmount = formData.get('total-amount');

    const userId = authenticateAndRedirect();
    try {
        const invoice = await prisma.invoice.update({
            where: {
                id,
                clerkId: '122939292'
            },
            data: {
                invoiceNumber, street, city, postCode, country, name, senderName, email, clientStreet, clientCity, clientPostCode, clientCountry, 
                invoiceDate, dueDate, paymentTerm, description, others, totalAmount, curr, itemLists: itemInputArr, status
            },
          })
          
        return { invoice, msg: "Invoice Successfully Updated"};
    } catch (error) {
        console.log(error);
        const invoice = null;
        return { invoice, msg: 'An error occurred' };
        
    }
};