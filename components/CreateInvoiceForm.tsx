"use client"
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const ItemList = () => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <div className='flex justify-between'>
    {/* <div className='grid gap-2 grid-cols-5'> */}
      <div className='w-4/12 flex flex-col'>
        <label htmlFor='item'>Item name</label>
        <Input type='text' name='item' id='item'/>
      </div>
      <div className='w-1/12 flex flex-col'>
        <label htmlFor='quantity'>Qty</label>
        <Input type='text' name='quantity' id='quantity' value={quantity} onChange={(e) => {
          setQuantity(Number(e.target.value));
          setTotal((prevState) => prevState + (price * quantity));
        }
        }/>
      </div>
      <div className='w-2/12 flex flex-col'>
        <label htmlFor='price'>Price</label>
        <Input type='text' name='price' id='price' value={price} onChange={(e) => {
          setPrice(Number(e.target.value));
          setTotal((prevState) => prevState + (price * quantity));
        }
        }/>
      </div>
      <div className='w-2/12 flex flex-col'>
          <p>Total</p>
          <p>{price * quantity}</p>
      </div>
      <div className='w-1/12 flex flex-col'>
          <div>s</div>
          <div>del</div>
      </div>
    </div>
  )
};

// useEffect(() =>{

// }, []);



const CreateInvoiceForm = () => {
  const [total, setTotal] = useState(0);
  const test = 'test'
  const items = [<ItemList/>, <ItemList/>];
  // const items = [<ItemList test={test} />, <ItemList/>];
  return (
    <form className=' px-8 py-9'>
      <p>Bill from</p>
      <label htmlFor='street'>Street Address</label>
      <Input type='text' name='street' id='street'/>
      <div className='grid gap-4 grid-cols-3 mt-4'>
        <div className='flex flex-col'>
          <label htmlFor='city'>City</label>
          <Input type='text' name='city' id='city'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='post-code'>Post Code</label>
          <Input type='text' name='post-code' id='post-code'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='country'>Country</label>
          <Input type='text' name='country' id='country'/>
        </div>
      </div>
      <p className='mt-6'>Bill from</p>
      <label htmlFor='name'>Client's Name</label>
      <Input className='mb-4' type='text' name='name' id='name'/>
      <label htmlFor='email'>Client's Email</label>
      <Input className='mb-4' type='email' name='email' id='email'/>

      <label htmlFor='client-street'>Street Address</label>
      <Input type='text' name='client-street' id='client-street'/>
      <div className='grid gap-4 grid-cols-3 mt-4'>
        <div className='flex flex-col'>
          <label htmlFor='client-city'>City</label>
          <Input type='text' name='client-city' id='client-city'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='client-post-code'>Post Code</label>
          <Input type='text' name='client-post-code' id='client-post-code'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='client-country'>Country</label>
          <Input type='text' name='client-country' id='client-country'/>
        </div>
      </div>
      <div className='grid gap-6 grid-cols-3 my-4'>
        <div className='flex flex-col'>
          <label htmlFor='invoice-date'>Invoice Date</label>
          <Input type='text' name='invoice-date' id='invoice-date'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='due-date'>Due Date</label>
          <Input type='text' name='due-date' id='due-date'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='due-date'>Currency</label>
          <Input placeholder='Select input for currency selection will be here' type='text' name='due-date' id='due-date'/>
        </div>
      </div>
      <label htmlFor='payment-term'>Payment Terms</label>
      <Input className='mb-4' placeholder='Account number, wallet address and other' type='text' name='payment-term' id='payment-term'/>
      <label htmlFor='description'>Project Description</label>
      <Input className='mb-4' type='text' name='description' id='description'/>
      <label htmlFor='others'>Additional Information</label>
      <Input placeholder='Account number, wallet address and other' type='text' name='others' id='others'/>
      <p className='mt-6'>Item Lists</p>
      {items.map((item, i) =>{
        return item
      })}
      {/* <p>{total}</p> */}
    </form>
  )
}

export default CreateInvoiceForm;