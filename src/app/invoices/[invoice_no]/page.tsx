"use client"
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import React, { useEffect, useRef, useState } from 'react'
import { api } from "@/axios";
import Loader from '@/components/common/Loader';
import moment from 'moment';
import ToogleSwitchButton from '@/components/Toggle/ToggleButton';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';

const OrderDatails = ({ params, searchParams }: {
  params: { invoice_no: string },
  searchParams: { id: string },
}) => {
    console.log("order id>>", params.invoice_no);
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const invoiceRef = useRef<HTMLDivElement>(null); 
    const buttonRef = useRef<HTMLDivElement>(null);
    const doc = new jsPDF();

    useEffect(() => {
      // Function to fetch customers
      const fetchOrderDetails = async () => {
        try {
          const response = await api.post(`/api/invoice-details-by-number`, {invoice_number: params.invoice_no});
          console.log("API Response Order Details>>:", response.data); // Log the response to inspect it
  
          // Check if the response was successful and if the customers array is present
          if (response.data.success) {
           
            setOrderDetails(response.data.invoice);
            
          } else {
            console.error("Unexpected response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      };
  
      fetchOrderDetails();
    }, [params.invoice_no]);
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
      <div
        ref={invoiceRef}
        className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-dark dark:shadow-card"
      >
        <div className=" mb-2 flex h-auto justify-center">
          <Image
            width={176}
            height={32}
            src={"/images/logo/medicose-logo.svg"}
            alt="Logo"
            priority
            className="dark:hidden"
            style={{ width: "174px", height: "auto" }}
          />
          <Image
            width={10}
            height={32}
            src={"/images/logo/medicose-logo.svg"}
            alt="Logo"
            priority
            className="hidden dark:block"
            style={{ width: "174px", height: "auto" }}
          />
        </div>

        {/* Invoice Info */}
        <div className="mb-6 mt-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {orderDetails.customer_id.customer_name}
          </h2>
          <p className="text-sm font-bold text-gray-500 dark:text-white">
            Invoice No:{" "}
            <span className="font-medium">{orderDetails.invoice_number}</span>
          </p>
        </div>

        {/* Date Info */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-black dark:text-white">
              Address:{" "}
            </p>
            <p className="text-gray-600 dark:text-white">
              {orderDetails.address}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold text-gray-700 dark:text-white">
              Date:
            </p>
            <p className="text-gray-600 dark:text-white">
              {moment(orderDetails.issue_date).format("YYYY-MM-DD")}
            </p>
          </div>
        </div>

        {/* <div className="flex items-center justify-end gap-2">
          <p className="text-sm font-bold text-gray-700 dark:text-white">
            Due Date:
          </p>
          <p className="text-gray-600 dark:text-white">
            {moment(orderDetails.due_date).format("YYYY-MM-DD")}
          </p>
        </div> */}

        {/* Products Table */}
        <div>
          {/* <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-white">
          <p className="text-sm font-bold text-black dark:text-white">
            Address:{" "}
            <span className="font-medium">{orderDetails.address}</span>
          </p>
          </h3> */}
          <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                  Product Name
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                  Quantity
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                  Rate
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                  Discount %
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                  Dis-Amount
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                  T-Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products.map((product: any, index: number) => {
                // Calculate total amount, discount amount, and final price after discount
                const totalAmount = product.rate * product.quantity;
                const discountAmount = totalAmount * (product.discount / 100); // Discount amount
                const finalPrice = totalAmount - discountAmount; // Final price after discount

                return (
                  <tr key={index} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2 text-center text-gray-900 dark:text-white">
                      {product.product_id.product_name}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-500 dark:text-white">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-900 dark:text-white">
                      {product.rate}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-900 dark:text-white">
                      {totalAmount.toFixed(1)} {/* Total before discount */}
                    </td>
                   
                    <td className="px-4 py-2 text-center text-gray-900 dark:text-white">
                      {product.discount.toFixed(1)}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-900 dark:text-white">
                      {discountAmount.toFixed(1)}
                    </td>
                    {/* Show Final Price After Discount */}
                    <td className="px-4 py-2 text-center text-gray-900 dark:text-white">
                     {product.amount.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="mx-3 mt-6 space-y-3">
          <div className="flex justify-end gap-1">
            <p className="font-medium text-gray-700 dark:text-white">
              Total Amount:
            </p>
            <p className="font-bold text-gray-900 dark:text-white">
              {orderDetails.total}
            </p>
          </div>

          <div className="flex justify-end gap-1">
            <p className="font-medium text-gray-700 dark:text-white">
              Old Balance:
            </p>
            <p className="font-bold text-gray-900 dark:text-white">
              {orderDetails.old_balance}
            </p>
          </div>

          <div className="flex justify-end gap-1">
            <p className="font-medium text-gray-700 dark:text-white">
              Total Balance:
            </p>
            <p className="font-bold text-gray-900 dark:text-white">
              {orderDetails.total_balance}
            </p>
          </div>

          <div className="flex justify-end gap-1">
            <p className="font-medium text-gray-700 dark:text-white">
              Net Balance:
            </p>
            <p className="font-bold text-gray-900 dark:text-white">
              {orderDetails.net_balance}
            </p>
          </div>

          <div className="flex justify-end gap-1">
            <p className="font-medium text-gray-700 dark:text-white">
              Invoice Status:
            </p>
            <p
              className={`font-bold ${
                orderDetails.status === "Paid"
                  ? "text-green-600"
                  : orderDetails.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-600"
              }`}
            >
              {orderDetails.status}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div ref={buttonRef} className="mt-6 flex space-x-4">
          <button
            type="button"
            className="flex items-center rounded-full bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleDownloadInvoice}
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