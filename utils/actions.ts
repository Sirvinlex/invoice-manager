'use server';
import { z } from 'zod';
// import prisma from '@/utils/db';
import prisma from './db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// proper clerkId is not being return for some reasons
export const authenticateAndRedirect = (): string =>{
    const { userId } = auth();
    if (!userId) redirect('/')
    return userId;
};

export const getAllInvoices = async () =>{
    try {
        const invoices = await prisma.invoice.findMany({
            where:{
              clerkId: '122939292'
            }
        });
        return invoices;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const createInvoice = async (formData: any, curr: string) =>{
    const totalArr = formData.getAll('total');
    const itemArr = formData.getAll('item');
    const quantityArr = formData.getAll('quantity');
    const priceArr = formData.getAll('price');
    
    const itemInputArr = [];

    let count = 0;
    while (count < totalArr.length){
      itemInputArr.push([itemArr[count], quantityArr[count], priceArr[count], totalArr[count],])
      count = count + 1;
    };
    
    const itemInputArrFinal = [...itemInputArr];

    const invoiceNumber = formData.get('invoice');
    const street = formData.get('street');
    const city = formData.get('city');
    const postCode = formData.get('post-code');
    const country = formData.get('country');
    const name = formData.get('name');
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
                clerkId: '122939292', invoiceNumber, street, city, postCode, country, name, email, clientStreet, clientCity, clientPostCode, clientCountry, 
                invoiceDate, dueDate, paymentTerm, description, others, totalAmount, curr
            },
        });
        return invoice;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const createDraft = async (formData: any) =>{
    console.log(formData.get('total-amount'), 'draft')
};