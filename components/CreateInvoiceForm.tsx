"use client"
import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

import { Button } from './ui/button';

const ItemList = ({itemId}: {itemId: any}) => {
  // "use client"
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  // let ref = useRef(0);
  return (
    <div className='flex justify-between mb-4'>
      <div className='w-4/12 flex flex-col'>
        <label htmlFor='item'>Item name</label>
        <Input type='text' name='item' id='item'/>
      </div>
      <div className='w-1/12 flex flex-col'>
        <label htmlFor='quantity'>Qty</label>
        <Input type='text' name='quantity' id='quantity' value={quantity} onChange={(e) => {
          setQuantity(Number(e.target.value));
          // ref.current = Number(e.target.value) * price;
          setTotal(Number(e.target.value) * price)
        }
        }/>
      </div>
      <div className='w-2/12 flex flex-col'>
        <label htmlFor='price'>Price</label>
        <Input type='text' name='price' id='price' value={price} onChange={(e) => {
          setPrice(Number(e.target.value));
          setTotal(Number(e.target.value) * quantity)
          // ref.current = Number(e.target.value) * quantity;
        }
        }/>
      </div>
      <div className='w-2/12 flex flex-col'>
          {/* <p>Total</p>
          <p>{price * quantity}</p> */}
          <label htmlFor='total'>Total</label>
          <Input type='text' name='total' id='total' value={total}/>
      </div>
      <div className='w-1/12 flex flex-col'>
          {/* <div>s</div> */}
          {/* <div>del</div> */}
          {/* <Button data-id={itemId} variant='ghost' onClick={(e) => handleDeleteItem(e)}><Trash/></Button> */}
          {/* <Button data-id={itemId} variant='ghost' onClick={handleDelete}><Trash/></Button> */}
      </div>
      {/* <Button data-id={itemId} variant='ghost' onClick={handleDelete}><Trash/></Button> */}
    </div>
  )
};


const CreateInvoiceForm = () => {
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [itemInput, setItemInput] = useState<any[]>([]);
  const [showBtn, setShowBtn] = useState(false);
  
  const handleDelItem = (id: any) =>{
    items.map((item, i) =>{
      console.log(item[1])
    })
  } 
  const handleAddItem = () =>{
    setShowBtn(true);
    const itemId = Math.ceil(Math.random() * 10) + new Date().getTime();
    setItems([...items, [<ItemList itemId={itemId} />, itemId]]);
  };

  const handleDeleteItem = (e: any) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('data-id');
    let tempItem = items.slice(0);

    setItems(tempItem.filter((item) => item[1] != id))
  };

  const handleClearItems = () =>{
    setShowBtn(false);
    setItems([]);
  };
  useEffect(() =>{
    if (items.length < 1) setShowBtn(false);
  }, [items.length]);

  const saveChanges = (e: any) =>{
    e.preventDefault();
    // setItemInput([]);
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
    
    setItemInput([...itemInput, ...itemInputArr]);
    
    let totalAmount = 0;
    totalArr.map((item) => totalAmount = totalAmount + Number(item));
    setTotal((prevState) => prevState + totalAmount);  
    setShowBtn(false);
    setItems([]);
  }

  return (
    <>
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
    </form>

    {!showBtn && itemInput.length < 1 ? <p className='mt-6 text-center'>You have not added any item to this invoice</p> : null}
    {!showBtn && itemInput.length > 0 ? (
            <Table>  
              <TableCaption>A list of your invoice items.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              {/* {itemInput.map((item, i) =>{ */}
                {/* return ( */}
                  <TableBody>
                    {itemInput.map((item, i) =>{
                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{item[0]}</TableCell>
                          <TableCell>{item[1]}</TableCell>
                          <TableCell>{item[2]}</TableCell>
                          <TableCell className="text-right">{item[3]}</TableCell>
                        </TableRow>
                      )
                    })}
                    <TableRow>
                          <TableCell className="font-medium"></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell className="text-right">Total: {total}</TableCell>
                        </TableRow>
                  </TableBody>
                
              
            </Table>
          
      ) : null}

    <form className=' px-8 py-9' onSubmit={saveChanges}>
      
      {items.map((item: any ) =>{
        return <>
          {showBtn? (
            <div key={item[1]} className='flex'><div>{item[0]}</div><Button data-id={item[1]} variant='ghost' onClick={handleDeleteItem}><Trash/></Button></div>
      
          ) : null}
        </>
        })}

      <Button className='w-full mb-4' type='button' onClick={handleAddItem}>+Add New Item</Button>
      
      {showBtn ? (
        <div className='grid gap-6 grid-cols-2'>
          <Button type='submit' className='bg-green-500 hover:bg-green-400'>Save Changes</Button>
          <Button className='bg-amber-500 hover:bg-amber-400' type='button' onClick={handleClearItems}>Cancel</Button>
        </div>
      ) : null}
      
    </form>
    </>
  )
}

export default CreateInvoiceForm;