"use client"
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import React, { useEffect, useRef, useState } from 'react'
import { api } from "@/axios";
import Loader from '@/components/common/Loader';
import moment from 'moment';
import ToogleSwitchButton from '@/components/Toggle/ToggleButton';
import { useReactToPrint } from "react-to-print";


const OrderDatails = ({ params, searchParams }: {
  params: { order_id: string },
  searchParams: { id: string },
}) => {
    console.log("order id>>", params.order_id);
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const invoiceRef = useRef<HTMLDivElement>(null); 
    const buttonRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Ensure correct typing of the ref
    
  

    useEffect(() => {
      // Function to fetch customers
      const fetchOrderDetails = async () => {
        try {
          const response = await api.post(`/api/order-details`, {order_id: params.order_id});
          console.log("API Response Order Details>>:", response.data); // Log the response to inspect it
  
          // Check if the response was successful and if the customers array is present
          if (response.data.success) {
           
            setOrderDetails(response.data.order);
            
          } else {
            console.error("Unexpected response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      };
  
      fetchOrderDetails();
    }, [params.order_id]);
    const handlePrint = useReactToPrint({ contentRef });


     // Show loading or placeholder text while fetching the data
  if (!orderDetails) {
    return (
      <DefaultLayout>
       <Loader />
      </DefaultLayout>
    );
  }
    
    
  return (
    <DefaultLayout>
      <div
        ref={contentRef}
        className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-dark dark:shadow-card"
      >
        {/* Order Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {" "}
            {orderDetails.party_name}
          </h2>
          <p className="text-sm font-bold text-gray-500 dark:text-white">
            Order ID: <span className="font-medium">{orderDetails._id}</span>
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <p className="text-sm font-bold text-gray-700 dark:text-white">
            Order Date:
          </p>
          <p className="text-gray-600 dark:text-white">
            {moment(orderDetails.createdAt).format("YYYY-MM-DD")}
          </p>
        </div>
        {/* Products List */}
        {/* <div>
        <h3 className="text-lg font-semibold text-gray-700  dark:text-white mb-3">Products:</h3>
        <ul className="space-y-3">
          {orderDetails.products.map((product: any, index: number) => (
            <li
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {product.product_id.product_name}
                </p>
                <p className="text-sm text-gray-500 dark:text-white">Quantity: {product.quantity}</p>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">{product.amount}</p>
            </li>
          ))}
        </ul>
      </div> */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-700 dark:text-white">
            Products:
          </h3>
          <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  Product Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-white">
                  T-Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products.map((product: any, index: number) => (
                <tr key={index} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-900 dark:text-white">
                    {product.product_id.product_name}
                  </td>
                  <td className="px-4 py-2 text-gray-500 dark:text-white">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white">
                    {product.amount}
                  </td>
                  <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">
                    {product.amount * product.quantity}{" "}
                    {/* Calculating Total Amount */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="mx-3 mt-6 space-y-3">
          <div className="flex justify-end gap-1">
            <p className="font-medium text-gray-700 dark:text-white">
              Net Amount:
            </p>
            <p className="font-bold text-gray-900 dark:text-white">
              {orderDetails.total_amount}
            </p>
          </div>

          {/* <div className="flex justify-between">
            <p className="font-medium text-gray-700 dark:text-white">
              Order Status:
            </p>
            <p
              className={`font-bold ${
                orderDetails.orderStatus === "Received"
                  ? "text-green-600"
                  : orderDetails.orderStatus === "Pending"
                    ? "text-yellow-500"
                    : "text-red-600"
              }`}
            >
              {orderDetails.orderStatus}
            </p>
          </div> */}
          {/* <ToogleSwitchButton /> */}

          {/* <div className="flex justify-between">
            <p className="font-medium text-gray-700 dark:text-white">
              Payment Status:
            </p>
            <p
              className={`font-bold ${
                orderDetails.paymentStatus === "Pending"
                  ? "text-yellow-500"
                  : orderDetails.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-red-600"
              }`}
            >
              {orderDetails.paymentStatus}
            </p>
          </div> */}
        </div>

        {/* Action Buttons */}
        <div ref={buttonRef} className="mt-6 flex space-x-4">
          {/* <button
            type="button"
            className="flex items-center rounded-full bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button> */}
          <button
            type="button"
            onClick={() => handlePrint()}
            className="hidden rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 md:block"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </DefaultLayout>

  );
  
}

export default OrderDatails