'use server';
import { z } from 'zod';

export const createInvoice = async (formData: any) =>{
    const totalAmount = formData.get('total-amount');
    try {
        
    } catch (error) {
        
    }
};
export const createDraft = async (formData: any) =>{
    console.log(formData.get('total-amount'), 'draft')
};