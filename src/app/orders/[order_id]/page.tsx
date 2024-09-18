"use client"
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import React, { useEffect, useState } from 'react'
import { api } from "@/axios";
import Loader from '@/components/common/Loader';
import moment from 'moment';
import ToogleSwitchButton from '@/components/Toggle/ToggleButton';

const OrderDatails = ({ params, searchParams }: {
  params: { order_id: string },
  searchParams: { id: string },
}) => {
    console.log("order id>>", params.order_id);
    const [orderDetails, setOrderDetails] = useState<any>(null);

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

    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-dark dark:shadow-card shadow-md rounded-lg p-6">
      {/* Order Info */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white"> {orderDetails.party_name}</h2>
        <p className="text-sm text-gray-500 dark:text-white">
          Order ID: <span className="font-medium">{orderDetails._id}</span>
        </p>
      </div>

      {/* Products List */}
      <div>
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
      </div>

      {/* Order Summary */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <p className="font-medium text-gray-700 dark:text-white">Total Amount:</p>
          <p className="font-bold text-gray-900 dark:text-white">{orderDetails.total_amount}</p>
        </div>

        <div className="flex justify-between">
        <p className="font-medium text-gray-700 dark:text-white">Order Status: 
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
        </div>
        {/* <ToogleSwitchButton /> */}

        <div className="flex justify-between">
          <p className="font-medium text-gray-700 dark:text-white">Payment Status:</p>
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
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-gray-700 dark:text-white">Order Date:</p>
          <p className="text-gray-600 dark:text-white">
            {moment(orderDetails.createdAt).format("YYYY-MM-DD")}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          type="button"
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
    </DefaultLayout>

  );
  
}

export default OrderDatails