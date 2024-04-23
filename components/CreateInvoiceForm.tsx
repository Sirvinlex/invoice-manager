"use client"
import React, { useEffect, useState, } from 'react';
import { Trash } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"


import { Button } from './ui/button';

const ItemList = ({handleDelItem, setTotalAmount, totalAmount, itemId,}: {handleDelItem: any, setTotalAmount: any,totalAmount: any, itemId: any}) => {
  // "use client"
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);

  // let ref = useRef(0);
  useEffect(() =>{
    // console.log(totalAmount, 'total amount')
    // setTotalAmount(totalAmount - prevTotal); 
    setTotalAmount((prevState: any) => prevState - prevTotal); 
    // setTotalAmount(totalAmount + total);
    setTotalAmount((prevState: any) => prevState + total);
    // setAge(a => a + 1)
  }, [total]);

  return (
    <div className='flex justify-between my-4'>
      <div className='w-4/12 flex flex-col'>
        <label htmlFor='item'>Item name</label>
        <Input placeholder='Description of service or product...' type='text' name='item' id='item'/>
      </div>
      <div className='w-1/12 flex flex-col'>
        <label htmlFor='quantity'>Qty</label>
        <Input type='text' name='quantity' id='quantity' value={quantity} onChange={(e) => {
          setQuantity(Number(e.target.value));
          setPrevTotal(total);
          setTotal(Number(e.target.value) * price);  
        }
        }/>
      </div>
      <div className='w-2/12 flex flex-col'>
        <label htmlFor='price'>Price</label>
        <Input type='text' name='price' id='price' value={price} onChange={(e) => {
          setPrice(Number(e.target.value));
          setPrevTotal(total);
          setTotal(Number(e.target.value) * quantity);
        }
        }/>
      </div>
      <div className='w-2/12 flex flex-col'>
          {/* <p>Total</p>
          <p>{price * quantity}</p> */}
          <label htmlFor='total'>Total</label>
          <Input className='border-0' type='text' name='total' id='total' value={total}/>
      </div>
      <div className='w-1/12 flex flex-col'>
      <Button className='mt-9' data-id={itemId} variant='ghost' onClick={() => handleDelItem(itemId, total)}><Trash/></Button>
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
  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [itemInput, setItemInput] = useState<any[]>([]);
  const [showBtn, setShowBtn] = useState(false);
  const [currency, setCurrency] = useState('$');
  
  const currencyArr = ['USD $','NGN ₦', 'AUD $', 'CAD $'];

  const handleAddItem = () =>{
    setShowBtn(true);
    const itemId = Math.ceil(Math.random() * 10) + new Date().getTime();
    setItems([...items, [<ItemList handleDelItem={handleDelItem} setTotalAmount={setTotalAmount} totalAmount={totalAmount} itemId={itemId} />, itemId]]);
  };

  const handleDelItem = (id: any, total: any) => {
    console.log(id, total)
    let tempItem = items.slice(0);

    setItems(tempItem.filter((item) => item[1] != id))
  };
  // const handleDeleteItem = (e: any) => {
  //   e.preventDefault();
  //   const id = e.currentTarget.getAttribute('data-id');
  //   let tempItem = items.slice(0);

  //   setItems(tempItem.filter((item) => item[1] != id))
  // };

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
      
    setShowBtn(false);
    setItems([]);
  }

  const handleSubmit = (e: any) =>{
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
    
    const itemInputArrFinal = [...itemInput, ...itemInputArr];

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
    let curr = currency.split(' ')[1] ? currency.split(' ')[1] : '$';
    
  };

  return (
    <>
    <form  onSubmit={handleSubmit} className='bg-muted mx-8 lg:ml-20 my-9 px-16 py-16'>
    <div>
      <label className='text-3xl' htmlFor='invoice'>INVOICE</label>
      <Input className='w-38 mb-6' type='text' name='invoice' id='invoice'/>
    </div>
      <p className='text-xl font-medium'>Bill from</p>
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
      <p className='mt-6 text-xl font-medium'>Bill To</p>
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
          <label htmlFor='currency'>Currency</label>
        <select
          id='currency'
          className='border-slate-200 border-2 rounded-md h-10'
          value={currency} 
          onChange={e => setCurrency(e.target.value)} 
        >
          {currencyArr.map((currency: any, i: any) => <option  key={i} value={currency}>{currency.split(' ')[0]} ({currency.split(' ')[1]})</option>)}
        </select>

          {/* <Input placeholder='Select input for currency selection will be here' type='text' name='due-date' id='due-date'/> */}
        </div>
      </div>
      <label htmlFor='payment-term'>Payment Terms</label>
      <Input className='mb-4' placeholder='Account number, wallet address and other' type='text' name='payment-term' id='payment-term'/>
      <label htmlFor='description'>Project Description</label>
      <Input className='mb-4' type='text' name='description' id='description'/>
      <label htmlFor='others'>Additional Information</label>
      <Input placeholder='Other relevant information' type='text' name='others' id='others'/>

      {items.map((item: any , i: any) =>{
        return <>
          {showBtn? (
            // <div key={item[1]} className='flex'><div>{item[0]}</div><Button className='mt-9' data-id={item[1]} variant='ghost' onClick={handleDeleteItem}><Trash/></Button></div>
            <div key={item[1]} className='flex'>{item[0]}</div>
      
          ) : null}
        </>
        })}

      <Button variant='ghost' className='w-full mb-4 text-green-500' type='button' onClick={handleAddItem}>+Add New Item</Button>
      <p className='pb-10 text-xl font-medium'>Total Amount: {currency.split(' ')[1] ? currency.split(' ')[1] : '$'} {totalAmount}</p>  
      <Button className='w-full' type='submit'>Submit</Button>
    </form>
    </>
  )
}

export default CreateInvoiceForm;


{/* <form className=' px-8 py-9' onSubmit={saveChanges}>
      
      {items.map((item: any ) =>{
        return <>
          {showBtn? (
            <div key={item[1]} className='flex'><div>{item[0]}</div><Button data-id={item[1]} variant='ghost' onClick={handleDeleteItem}><Trash/></Button></div>
      
          ) : null}
        </>
        })}

      <Button variant='ghost' className='w-full mb-4 text-green-500' type='button' onClick={handleAddItem}>+Add New Item</Button>
      
      {showBtn ? (
        <div className='grid gap-6 grid-cols-2'>
          <Button type='submit' className='bg-green-500 hover:bg-green-400'>Save Items</Button>
          <Button className='bg-amber-500 hover:bg-amber-400' type='button' onClick={handleClearItems}>Cancel</Button>
        </div>
      ) : null}
      
    </form> */}