import React, { useState } from 'react'

const OrderProductTableRow = ({product} :any) => {

const [quantity, setQuantity]  = useState<any>(1)
  
  return (
    <div
          className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
        >
           <div className="col-span-1 flex items-center">
            <input type="checkbox" className='w-3 h-3 accent-blue-600'/>
           </div>
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* <div className="h-12.5 w-15 rounded-md">
              <Image
                src={product.image}
                width={60}
                height={50}
                alt="Product"
              />
            </div> */}
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.product_name}
              </p>
            </div>
          </div>
          
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.price * quantity}
            </p>
          </div>
          <div className="col-span-3 flex items-center">
          {/* <!-- Input Number --> */}
<div className="py-2 px-3 bg-white border border-gray-200 rounded-lg" data-hs-input-number="">
  <div className="w-full flex justify-between items-center gap-x-5">
    <div className="grow">
      <span className="block text-xs text-gray-500">
        Select quantity
      </span>
      <input   className="w-full outline-none p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"  type="number" aria-roledescription="Number field" value={quantity}  onChange={(e: any)=>{(e.target.value >=1) ? setQuantity(e.target.value) : setQuantity(quantity) }} />
    </div>
    <div className="flex justify-end items-center gap-x-1.5">
      <button onClick={()=>setQuantity((prev: any) => prev > 1 ? prev-1 : prev)} type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Decrease" data-hs-input-number-decrement="">
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
        </svg>
      </button>
      <button onClick={()=>setQuantity((prev: any) => prev + 1)} type="button" className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabIndex={-1} aria-label="Increase" data-hs-input-number-increment="">
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
{/* <!-- End Input Number --> */}
          </div>
          {/* <div className="col-span-1 flex items-center">
          <p className="text-body-sm font-medium text-dark dark:text-dark-6">
            {product.sold}
          </p>
        </div> */}
          {/* <div className="col-span-1 flex items-center">
          <p className="text-body-sm font-medium text-green">
            ${product.profit}
          </p>
        </div> */}
        </div>
  )
}

export default OrderProductTableRow