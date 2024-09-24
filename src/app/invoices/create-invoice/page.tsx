"use client"
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import React, { useState } from 'react';

const CreateInvoice = () => {
  const [invoice, setInvoice] = useState({
    customerName: '',
    products: [
      { productName: '', quantity: 1, rate: 0, discount: 0, total: 0 }
    ],
    issueDate: '',
    dueDate: '',
  });

  // Function to add a new product row
  const addProduct = () => {
    setInvoice({
      ...invoice,
      products: [
        ...invoice.products,
        { productName: '', quantity: 1, rate: 0, discount: 0, total: 0 }
      ]
    });
  };

  // Function to update product details
  const updateProduct = (index: number, field: string, value: any) => {
    const newProducts = invoice.products.map((product, i) =>
      i === index ? { ...product, [field]: value, total: (value.quantity || product.quantity) * (value.rate || product.rate) - value.discount } : product
    );
    setInvoice({ ...invoice, products: newProducts });
  };
  const totalAmount = invoice.products.reduce((total, product) => {
    return total + (product.rate * product.quantity - product.discount);
  }, 0);

  const availableProducts = [
    { name: "Mask", rate: 50 },
    { name: "Bandage", rate: 30 },
    { name: "Siring", rate: 100 },
    { name: "Hand Band", rate: 200 },
    // Add more products as needed
  ];
  return (
    <DefaultLayout>
      <div className="container mx-auto rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark ">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-white">
          Sale Invoice
        </h2>
        <div className="mb-3 flex items-baseline justify-end gap-1">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
            Issue Date:
          </label>
          <span className="dark:text-white">
            {new Date().toISOString().split("T")[0]}{" "}
          </span>
        </div>
        {/* Customer Information */}
        <div className="mb-4 flex justify-between">
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-white">
              Customer Name
            </label>
            <input
              type="text"
              value={invoice.customerName}
              onChange={(e) =>
                setInvoice({ ...invoice, customerName: e.target.value })
              }
              className="w-40 rounded-md border px-3 py-2 focus:outline-none dark:bg-gray-800 dark:text-white"
              placeholder="Select customer"
            />
          </div>

          <div className="flex items-baseline gap-1">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
              Supply Date:{" "}
            </label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) =>
                setInvoice({ ...invoice, dueDate: e.target.value })
              }
              className="h-7 w-40 rounded-md border border-none px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Product Table */}
        <table className="min-w-full bg- dark:bg-gray-7 00 ">
          <thead>
            <tr className="rounded-2xl bg-gray-100 shadow-md dark:bg-gray-800">
              <th className="px-4 py-2 dark:text-white">Product Name</th>
              <th className="px-4 py-2 dark:text-white">T.P</th>
              <th className="px-4 py-2 dark:text-white">Quantity</th>
              <th className="px-4 py-2 dark:text-white">Amount</th>
              <th className="px-4 py-2 dark:text-white">Discount (%)</th>
              <th className="px-4 py-2 dark:text-white">N-Total</th>
            </tr>
          </thead>
          <tbody>
          {invoice.products.map((product, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">
                <select
                  
                  onChange={(e) => {
                    const selectedProduct = availableProducts.find(
                      (p) => p.name === e.target.value
                    );
                    updateProduct(index, "productName", e.target.value);
                    if (selectedProduct) {
                      updateProduct(index, "rate", selectedProduct.rate);
                    }
                  }}
                  className="w-full rounded-md border text-center px-2 py-1 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Product</option>
                  {availableProducts.map((p, idx) => (
                    <option key={idx} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={product.rate}
                  onChange={(e) =>
                    updateProduct(index, "rate", Number(e.target.value))
                  }
                  className="w-full rounded-md border text-center px-2 py-1 dark:bg-gray-700 dark:text-white"
                  placeholder="Rate"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    updateProduct(index, "quantity", Number(e.target.value))
                  }
                  className="w-full rounded-md border text-center px-2 py-1 dark:bg-gray-700 dark:text-white"
                  placeholder="Quantity"
                />
              </td>
              <td className="px-4 py-2 dark:text-white text-center">
                {product.rate * product.quantity}{" "}
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.discount}
                  onChange={(e) =>
                    updateProduct(index, "discount", Number(e.target.value))
                  }
                  className="w-full rounded-md border text-center px-2 py-1 dark:bg-gray-700 dark:text-white"
                  placeholder="Discount"
                />
              </td>
              <td className="px-4 py-2 dark:text-white text-center">
                {product.rate * product.quantity - product.discount}{" "}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        {/* T-Amount section */}
      <div className="mt-4 text-right flex justify-between items-center w-full">
        
        {/* Add Product Button */}
        <button
          onClick={addProduct}
          className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition"
        >
          +
        </button>

        <h3 className="font-medium text-gray-700 dark:text-white">T-Amount: {totalAmount}</h3>
      </div>

        {/* Save Invoice Button */}
        <button
          onClick={() => console.log(invoice)} // Here you would call your API to save the invoice
          className="mt-6 rounded-md bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
        >
          Save Invoice
        </button>
      </div>
    </DefaultLayout>
  );
};

export default CreateInvoice;
