"use client"
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import React, { useEffect, useRef, useState } from 'react'
import { api } from "@/axios";
import Loader from '@/components/common/Loader';
import moment from 'moment';
import ToogleSwitchButton from '@/components/Toggle/ToggleButton';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

const OrderDatails = ({ params, searchParams }: {
  params: { order_id: string },
  searchParams: { id: string },
}) => {
    console.log("order id>>", params.order_id);
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const invoiceRef = useRef<HTMLDivElement>(null); 
    const buttonRef = useRef<HTMLDivElement>(null);
    const doc = new jsPDF();

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
    const handleDownloadInvoice = async () => {
      if (invoiceRef.current && buttonRef.current) {
        if (buttonRef.current) buttonRef.current.classList.add('hide-in-pdf');
        buttonRef.current.style.display = 'none';
        const element = invoiceRef.current;
        
        // Capture the DOM as an image using html2canvas
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
        const imgData = canvas.toDataURL('image/png');
        
        // Create a new PDF document using jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for the size
  
        // Calculate the width and height based on A4 page size (210mm x 297mm)
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        let heightLeft = imgHeight;
        let position = 0;
  
        // Add image to the PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        // If the content is larger than one page, add more pages
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        // Save the generated PDF
        element.style.backgroundColor = "";
        pdf.save(`invoice_${orderDetails._id}.pdf`);
        buttonRef.current.style.display = 'flex';
      }
    };

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

    <div ref={invoiceRef} className="max-w-2xl mx-auto bg-white dark:bg-gray-dark dark:shadow-card shadow-md rounded-lg p-6">
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
      <div ref={buttonRef} className="mt-6 flex space-x-4">
        <button
          type="button"
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={handleDownloadInvoice}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition md:block hidden"
        >
          Download Invoice
        </button>
      </div>
    </div>
    </DefaultLayout>

  );
  
}

export default OrderDatails