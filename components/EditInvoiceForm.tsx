"use client"
import React, { useEffect, useState, } from 'react';
import { Trash } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, } from "@/components/ui/card"
import { Button } from './ui/button';
import { createDraft, createInvoice, editInvoice } from '@/utils/actions';
import { InvoiceType } from '@/utils/types';

const ItemList = ({
  first, setItems, setTotalAmount, itemId, itemDescription, itemQuantity, itemPrice, itemTotal, totalAmount
}: {
  first: boolean, setItems: any, setTotalAmount: React.Dispatch<React.SetStateAction<number>>, itemId: number, itemDescription: string,
  itemQuantity: number, itemPrice:number, itemTotal: number, totalAmount: number
}) => {
  const [price, setPrice] = useState(itemPrice);
  const [quantity, setQuantity] = useState(itemQuantity);
  const [total, setTotal] = useState(itemTotal);
  const [prevTotal, setPrevTotal] = useState(0);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

 useEffect(() =>{
  setTotalAmount((prevState: number) => prevState - total);
 }, []);

  useEffect(() =>{
     
    setTotalAmount((prevState: number) => prevState - prevTotal); 
    setTotalAmount((prevState: number) => prevState + total);
  }, [total]);

  const del = (itemId: number, total: number) =>{
    setTotalAmount((prevState: number) => prevState - total);
    setItems((prevState: any) => prevState.filter((item: any) => item[1] != itemId));
  };

  return (
    <div className='flex flex-col lg:flex-row w-full justify-between lg:mb-0 mt-4' onMouseOver={() => setShowDeleteBtn(true)} onMouseOut={() => setShowDeleteBtn(false)}>
      <div className={showDeleteBtn && first === false ? 'lg:w-4/12 mb-2 w-full lg:block flex' : 'lg:block flex w-full lg:w-6/12 mb-2'}>
        <Input placeholder='Description of service or product...' type='text' name='item' id='item' defaultValue={itemDescription}/>
        {first === false ? (
          <Button className='lg:hidden block' data-id={itemId} variant='ghost' onClick={() => del(itemId, total)}>
            <Trash/>
          </Button>
        ) : null}
      </div>
      
      <div className={showDeleteBtn && first === false ? 'lg:w-8/12 flex w-full justify-between' : 'w-full lg:w-6/12 flex justify-between'} >
        <div className={showDeleteBtn && first === false ? 'w-3/12' : 'w-3/12'}>
          <label className='lg:hidden'>Quantity</label>
          <Input className='w-full lg:ml-4' type='text' name='quantity' id='quantity'  value={quantity} onChange={(e) => {
              setQuantity(Number(e.target.value));
              setPrevTotal(total);
              setTotal(Number(e.target.value) * price);  
            }
          }/>
        </div>

        <div className={showDeleteBtn && first === false ? 'w-4/12 lg:w-3/12' : 'w-4/12'}>
          <label className='lg:hidden'>Price</label>
          <Input className='w-full lg:ml-1' type='text' name='price' id='price' value={price} onChange={(e) => {
              setPrice(Number(e.target.value));
              setPrevTotal(total);
              setTotal(Number(e.target.value) * quantity);
            }
          }/>
        </div>
        
        <div className={showDeleteBtn && first === false ? 'w-4/12 lg:w-3/12' : 'w-4/12'}>
          <label className='mt-2 lg:hidden'>Total</label>
          <Card className='lg:w-full border-0 pr-4 py-2 pl-3 rounded text-sm'>{total}</Card>
          <Input type="hidden" name='total' id='total' value={total}/>
        </div>
        
        {first === false ? (
          <Button className={showDeleteBtn && first === false ? 'hidden w-1/12 lg:block' : 'w-1/12 hidden'} data-id={itemId} variant='ghost' onClick={() => del(itemId, total)}>
            <Trash/>
          </Button>
        ) : null}
      </div>
      <hr className='mt-4 bg-slate-500 h-0.5 lg:hidden'/>
    </div>
  )
};


const EditInvoiceForm = ({ invoice, setShowEditForm }: { invoice: InvoiceType, setShowEditForm: any}) => {
  // const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(Number(invoice.totalAmount));
  const [currency, setCurrency] = useState<string>(invoice?.curr);
  const [items, setItems] = useState<any[]>([]);
  const [isDraft, setIsDraft] = useState<boolean>(false);
  const currencyArr:string[] = ['USD $','NGN ₦', 'AUD $', 'CAD $'];
  const firstItemId = Math.ceil(Math.random() * 10) + new Date().getTime();

  const firstItemDescription = invoice?.itemLists[0].split(',')[0];
  const firstItemQuantity = Number(invoice?.itemLists[0].split(',')[1]);
  const firstItemPrice = Number(invoice?.itemLists[0].split(',')[2]);
  const firstItemTotal = Number(invoice?.itemLists[0].split(',')[3]);

  const invoiceItemCopy = invoice?.itemLists.slice(1);
// console.log(invoiceItemCopy, 'testing')
const itemCopyArr: any[] = [];
  useEffect(() =>{
    let count = 0;
    while(count < invoiceItemCopy.length){
        const itemId = count;
        // const itemId = Math.ceil(Math.random() * 10) + new Date().getTime();
        const itemQuantity = Number(invoiceItemCopy[count].split(',')[1]);
        const itemPrice = Number(invoiceItemCopy[count].split(',')[2]);
        const itemTotal = Number(invoiceItemCopy[count].split(',')[3]);
        const itemDescription = invoiceItemCopy[count].split(',')[0];

        // [<ItemList first={false} setItems={setItems} setTotalAmount={setTotalAmount} itemId={itemId} />, itemId]

        itemCopyArr.push([ 
          <ItemList first={false} setItems={setItems} setTotalAmount={setTotalAmount} itemId={itemId} itemDescription={itemDescription}
          itemQuantity={itemQuantity} itemPrice={itemPrice} itemTotal={itemTotal} totalAmount={totalAmount}
          /> , itemId])
      
      count = count + 1;
    }

    setItems((prevState: any) => [...prevState, ...itemCopyArr])
    
  }, []);

  const handleAddItem = () =>{
    const itemId = Math.ceil(Math.random() * 10) + new Date().getTime();
    setItems((prevState: any) => [...prevState, 
      [ 
        <ItemList first={false} setItems={setItems} setTotalAmount={setTotalAmount} itemId={itemId} itemDescription=''
        itemQuantity={0} itemPrice={0} itemTotal={0} totalAmount={totalAmount}
        /> , itemId]
    ])
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, isDraft: boolean) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
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
    const senderName = formData.get('sender-name');
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
    let curr = currency;

    if (!Number.isInteger(Number(totalAmount))) alert('Please provide a valid quantity and amount');

    let isItemInputComplete = true;
      itemInputArrFinal.map((item: any) =>{
        if (!item[0] || item[1] < 1 || item[2] < 1 || item[3] < 1) {
          isItemInputComplete = false;
          return;
        }
      });

    if (isDraft){
      let isItemInput = false;
      itemInputArrFinal.map((item: any) =>{
        if (item[0] || item[1] > 0 || item[2] > 0 || item[3] > 0) {
          isItemInput = true;
          return;
        }
      });

      if (invoiceNumber || street || city || country || name || senderName || email || clientStreet || clientCity || clientCountry || invoiceDate 
        || dueDate || paymentTerm || description || others || isItemInput) {
        editInvoice(formData, curr, invoice?.id, 'draft')
      }else{
        alert('Draft cannot be empty');
      }
      
    }else{
      if (!invoiceNumber || !street || !city || !country || !name || !senderName || !email || !clientStreet || !clientCity || !clientCountry || !invoiceDate 
        || !dueDate || !paymentTerm || !description || !curr) {
        alert('Please provide all fields marked *');
      } else if (!isItemInputComplete) {
        alert('Please provide all fields in Item lists');
      } else {
        editInvoice(formData, curr, invoice?.id, 'pending')
      }
      
    };
    
  };

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 w-full'>
    <form onSubmit={(e) => handleSubmit(e, isDraft)} className='bg-muted mb-12 px-6 md:px-16 py-16  w-full'>
      <Button className='mb-4 float-right' onClick={() => setShowEditForm(false)}>Close</Button>
    <div>
      <label className='text-xl md:text-3xl' htmlFor='invoice'>INVOICE*</label>

      <div className="relative"> 
              {/* <Input className='border-0 pl-6 pr-4 py-2' type='text' name='total' id='total' value={total}/> */}
              <Input className='w-32 md:w-44 mb-6 pl-8 pr-4 py-2' type='text' name='invoice' id='invoice' defaultValue={invoice?.invoiceNumber}/>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                  <span>#</span>
              </div> 
      </div>

      
    </div>
      <p className='text-xl font-medium'>Bill from</p>
      <label htmlFor='sender-name'>Name*</label>
      <Input className='mb-4' type='text' name='sender-name' id='sender-name' defaultValue={invoice?.senderName}/>
      <label htmlFor='street'>Street Address*</label>
      <Input type='text' name='street' id='street' defaultValue={invoice?.street}/>
      <div className='flex flex-col md:grid md:gap-4 md:grid-cols-3 mt-4'>
        <div className='flex flex-col'>
          <label htmlFor='city'>City*</label>
          <Input type='text' name='city' id='city' defaultValue={invoice?.city}/>
        </div>
        <div className='mt-4 md:mt-0 flex flex-col'>
          <label htmlFor='post-code'>Post Code</label>
          <Input type='text' name='post-code' id='post-code' defaultValue={invoice?.postCode}/>
        </div>
        <div className='mt-4 md:mt-0 flex flex-col'>
          <label htmlFor='country'>Country*</label>
          <Input type='text' name='country' id='country' defaultValue={invoice?.country}/>  
        </div>
      </div>
      <p className='mt-6 text-xl font-medium'>Bill To</p>
      <label htmlFor='name'>Client's Name*</label>
      <Input className='mb-4' type='text' name='name' id='name' defaultValue={invoice?.name}/>
      <label htmlFor='email'>Client's Email*</label>
      <Input className='mb-4' type='email' name='email' id='email' defaultValue={invoice?.email}/>

      <label htmlFor='client-street'>Street Address*</label>
      <Input type='text' name='client-street' id='client-street' defaultValue={invoice?.clientStreet}/>
      <div className='flex flex-col md:grid md:gap-4 md:grid-cols-3 mt-4'>
        <div className='flex flex-col'>
          <label htmlFor='client-city'>City*</label>
          <Input type='text' name='client-city' id='client-city' defaultValue={invoice?.clientCity}/>
        </div>
        <div className='mt-4 md:mt-0 flex flex-col'>
          <label htmlFor='client-post-code'>Post Code</label>
          <Input type='text' name='client-post-code' id='client-post-code' defaultValue={invoice?.clientPostCode}/>
        </div>
        <div className='mt-4 md:mt-0 flex flex-col'>
          <label htmlFor='client-country'>Country*</label>
          <Input type='text' name='client-country' id='client-country' defaultValue={invoice?.clientCountry}/>
        </div>
      </div>
      <div className='flex flex-col md:grid md:gap-6 md:grid-cols-3 my-4'>
        <div className='flex flex-col'>
          <label htmlFor='invoice-date'>Invoice Date*</label>
          <Input type='text' name='invoice-date' id='invoice-date' defaultValue={invoice?.invoiceDate}/>
        </div>
        <div className='mt-4 md:mt-0 flex flex-col'>
          <label htmlFor='due-date'>Due Date*</label>
          <Input type='text' name='due-date' id='due-date' defaultValue={invoice?.dueDate}/>
        </div>
        <div className='mt-4 md:mt-0 flex flex-col'>
          <label htmlFor='currency'>Currency*</label>
          <select
            id='currency'
            className='border-slate-200 border-2 rounded-md h-10'
            value={currency} 
            onChange={e => setCurrency((prevState: any) => e.target.value)} 
          >
            {currencyArr.map((item: any, i: any) => <option  key={i} value={item} >{item.split(' ')[0]} ({item.split(' ')[1]})</option>)}
          </select>

        </div>
      </div>
      <label htmlFor='payment-term'>Payment Terms*</label>
      <Input className='mb-4' placeholder='Account number, wallet address and other' type='text' name='payment-term' id='payment-term' defaultValue={invoice?.paymentTerm}/>
      <label htmlFor='description'>Project Description*</label>
      <Input className='mb-4' type='text' name='description' id='description' defaultValue={invoice?.description}/>
      <label htmlFor='others'>Additional Information</label>
      <Input placeholder='Other relevant information' type='text' name='others' id='others' defaultValue={invoice?.others ? invoice?.others : ''}/>
      <div className='text-white items-center pl-2 flex justify-between w-full h-11 bg-blue-900 rounded mt-7'>
      <div className='flex justify-between my-4 w-full'>
          <div className='hidden lg:block lg:w-6/12'>Item Name</div>  
          <div className='w-full lg:hidden text-center'>Lists of Items</div>  
          <div className='hidden lg:w-6/12 lg:flex lg:justify-between'>
            <div className='pl-3 lg:w-4/12'>Quantity</div>   
            <div className='w-4/12'>Price</div>
            <div className='w-3/12'>Total</div>
          </div>
        </div>
        
      </div>
      <ItemList first={true} setItems={setItems} setTotalAmount={setTotalAmount} itemId={firstItemId} itemDescription={firstItemDescription}
        itemQuantity={firstItemQuantity} itemPrice={firstItemPrice} itemTotal={firstItemTotal} totalAmount={totalAmount}
      />
      {items.map((item: any , i: any) =>{
        return <div key={item[1]}>
            <div className='flex'>{item[0]}</div>
        </div>
        })}

      <Button variant='ghost' className='w-32 text-center block ml-auto mr-auto  text-green-500' type='button' onClick={handleAddItem}>+Add New Item</Button>
      <p className='pb-10 text-xl font-medium'>Total Amount: {currency.split(' ')[1] ? currency.split(' ')[1] : '$'} {totalAmount}</p> 
      <Input type="hidden" name='total-amount' id='total-amount' value={totalAmount}/> 
      <Button onClick={() => setIsDraft((prevState) => false)} className='w-full' type='submit'>Submit</Button>
      {invoice?.status === 'draft' ? (
        <Button variant='ghost' onClick={() => setIsDraft((prevState) => true)} className='w-32 text-center block mt-2 ml-auto mr-auto' type='submit'>Save as Draft</Button>
      ) : null}
      </form>
    </div>
  )
}

export default EditInvoiceForm;


