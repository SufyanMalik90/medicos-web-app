"use client"
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import React, { useEffect, useState } from 'react';
import { api } from "@/axios";

const CreateInvoice = () => {
  const [products, setProducts] = useState<any>([]); // API fetched products

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/api/all-products`);
        console.log("API Response Products:", response.data);

        if (response.data.success && Array.isArray(response.data.products)) {
          const sortedProducts = response.data.products.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setProducts(sortedProducts);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <DefaultLayout>
      <div className="container mx-auto rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-white">
          Sale Invoice
        </h2>

        {/* Customer and Date Information */}
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
        <table className="bg- min-w-full dark:bg-gray-700">
          <thead>
            <tr className="rounded-2xl bg-gray-100 shadow-md dark:bg-gray-800">
              <th className="px-4 py-2 dark:text-white">Product Name</th>
              <th className="px-4 py-2 dark:text-white">T.P</th>
              <th className="px-4 py-2 dark:text-white">Quantity</th>
              <th className="px-4 py-2 dark:text-white">Amount</th>
              <th className="px-4 py-2 dark:text-white">Discount (%)</th>
              <th className="px-4 py-2 dark:text-white">Dis-Amount</th>
              <th className="px-4 py-2 dark:text-white">N-Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((product: any, index: any) => {
              const amount = product.rate * product.quantity;
              const discountAmount = (amount * product.discount) / 100; // Dis-Amount
              const netTotal = amount - discountAmount; // N-Total

              return (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    <select
                      onChange={(e) => {
                        const selectedProduct = products.find(
                          (p: any) => p.product_name === e.target.value,
                        );
                        updateProduct(index, "productName", e.target.value);
                        if (selectedProduct) {
                          updateProduct(index, "rate", selectedProduct.price); // Use price from API
                        }
                      }}
                      className="w-full rounded-md border px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Product</option>
                      {products.map((p: any, idx: number) => (
                        <option key={idx} value={p.product_name}>
                          {p.product_name}
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
                      className="w-full rounded-md border px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                      placeholder="Rate"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProduct(index, "quantity", Number(e.target.value))
                      }
                      className="w-full rounded-md border px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                      placeholder="Quantity"
                    />
                  </td>
                  <td className="px-4 py-2 text-center dark:text-white">
                    {amount}{" "}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={product.discount}
                      onChange={(e) =>
                        updateProduct(index, "discount", Number(e.target.value))
                      }
                      className="w-full rounded-md border px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                      placeholder="Discount"
                    />
                  </td>
                  <td className="px-4 py-2 text-center dark:text-white">
                    {discountAmount}{" "}
                  </td>
                  <td className="px-4 py-2 text-center dark:text-white">
                    {netTotal}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Total Amount Section */}
        <div className="mt-4 flex w-full items-center justify-between text-right">
          <button
            onClick={addProduct}
            className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition"
          >
            +
          </button>
          <h3 className="font-medium text-gray-700 dark:text-white">
            T-Amount: {totalAmount}
          </h3>
        </div>

        {/* Save Invoice Button */}
        <button
          onClick={() => console.log(invoice)} // Save invoice functionality
          className="mt-6 rounded-md bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
        >
          Save Invoice
        </button>
      </div>
    </DefaultLayout>
  );
};


export default CreateInvoice;
