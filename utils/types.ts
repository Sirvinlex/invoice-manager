export enum InvoiceStatus {
    all = 'all',
    paid = 'paid',
    pending = "pending",
    draft = "draft",
};

export type getAllInvoicesType = {
    search?: string;
    invoiceStatus?: string;
    page?: number;
    limit?: number;
}

export type InvoiceType = {
    id: string;   
    clerkId: string;
    invoiceNumber: string;
    street: string;
    city: string;
    postCode: string;
    country: string;
    name: string;
    senderName: string;
    email: string;
    clientStreet: string;
    clientCity: string;
    clientPostCode: string;
    clientCountry: string;
    invoiceDate: string;
    dueDate: string;
    paymentTerm: string;
    description: string;
    others: string | null;
    totalAmount: string;
    curr: string;
    createdAt: Date; 
    status: string; 
    itemLists: string[];
};
export type InvoiceDraftType = {
    id?: string;   
    clerkId: string;
    invoiceNumber?: string;
    street?: string;
    city?: string;
    postCode?: string;
    country?: string;
    name?: string;
    senderName?: string;
    email?: string;
    clientStreet?: string;
    clientCity?: string;
    clientPostCode?: string;
    clientCountry?: string;
    invoiceDate?: string;
    dueDate?: string;
    paymentTerm?: string;
    description?: string;
    others?: string | null;
    totalAmount?: string;
    curr?: string;
    createdAt: Date
    status?: string; 
    itemLists?: string[]
};


  