import React, { useState } from 'react';

const OrderProductTableRow = ({ product, onQuantityChange, onCheckboxChange }:any) => {
  const [quantity, setQuantity] = useState(1);

  const handleCheckboxChange = (e:any) => {
    onCheckboxChange(e.target.checked);
  };

  return (
    <div className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div className="col-span-1 flex items-center">
        <input
          type="checkbox"
          className='w-3 h-3 accent-blue-600'
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="col-span-3 flex items-center">
        <p className="text-body-sm font-medium text-dark dark:text-dark-6">
          {product.product_name}
        </p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="text-body-sm font-medium text-dark dark:text-dark-6">
          {product.price * quantity}
        </p>
      </div>
      <div className="col-span-3 flex items-center">
        <div className="py-2 px-3 bg-white border border-gray-200 rounded-lg">
          <div className="w-full flex justify-between items-center gap-x-5">
            <div className="grow">
              <span className="block text-xs text-gray-500">Select quantity</span>
              <input
                className="w-full outline-none p-0 bg-transparent border-0 text-gray-800 focus:ring-0"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const newQuantity = Math.max(1, Number(e.target.value));
                  setQuantity(newQuantity);
                  onQuantityChange(newQuantity);
                }}
              />
            </div>
            <div className="flex justify-end items-center gap-x-1.5">
              <button onClick={() => onQuantityChange(quantity - 1)} disabled={quantity <= 1} type="button">
                {/* Decrease button */}
              </button>
              <button onClick={() => setQuantity(prev => prev + 1)} type="button">
                {/* Increase button */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductTableRow;
