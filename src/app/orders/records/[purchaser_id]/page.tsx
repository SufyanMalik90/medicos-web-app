"use client"
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import React, { useEffect, useRef, useState } from 'react'
import { api } from "@/axios";
import Loader from '@/components/common/Loader';
import moment from 'moment';
import ToogleSwitchButton from '@/components/Toggle/ToggleButton';
import {jsPDF} from 'jspdf';
import { useReactToPrint } from "react-to-print";
import Image from 'next/image';

const LeadgerDetails = ({ params, searchParams }: {
  params: { purchaser_id: string },
  searchParams: { id: string },
}) => {
    console.log("order id>>", params.purchaser_id);
    const [ledgerDetails, setLedgerDetails] = useState<any>(null);
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const invoiceRef = useRef<HTMLDivElement>(null); 
    const buttonRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Ensure correct typing of the ref


    useEffect(() => {
      const fetchLedgerDetails = async () => {
        try {
          const response = await api.post(`/api/purchaser-ledger-history`, { purchaser_id: params.purchaser_id });
          console.log("API Response Ledger Details:", response.data);
          if (response.data.success) {
            setLedgerDetails(response.data);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching ledger details:", error);
        }
      };
      fetchLedgerDetails();
    }, [params.purchaser_id]);
    const handlePrint = useReactToPrint({ contentRef });

     // Show loading or placeholder text while fetching the data
  if (!ledgerDetails) {
    return (
      <DefaultLayout>
       <Loader />
      </DefaultLayout>
    );
  }
    
    
  return (
    <DefaultLayout>
      <div ref={buttonRef} className="mx-auto my-6 flex max-w-4xl justify-end">
        <button
          onClick={() => handlePrint()}
          className="hidden rounded-full bg-[#5750f1] px-4 py-2 text-white transition hover:bg-blue-700 md:block"
        >
          Print Details
        </button>
      </div>
      <div
        ref={contentRef}
        className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-dark dark:shadow-card"
      >
        <div className="mb-2 flex h-auto items-center justify-between">
          <div className="flex items-center">
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
              width={176}
              height={32}
              src={"/images/logo/medicose-logo.svg"}
              alt="Logo"
              priority
              className="hidden dark:block"
              style={{ width: "174px", height: "auto" }}
            />
          </div>
          <p className="flex-grow text-center text-3xl font-bold text-black dark:text-white">
            Account Details
          </p>
          <div className="w-44"></div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {ledgerDetails.purchaser_name}
          </h2>
        </div>

        <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Date
              </th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Description
              </th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Type
              </th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-gray-800 dark:text-white">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {ledgerDetails.ledgerHistory.map((entry: any, index: number) => (
              <tr key={index} className="border-b dark:border-gray-700">
                <td className="px-4 py-2 text-black dark:text-white">
                  {moment(entry.date).format("YYYY-MM-DD")}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">
                  {entry.description}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">
                  {entry.type}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">
                  {entry.amount}
                </td>
                <td className="px-4 py-2 text-black dark:text-white">
                  {entry.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
  
}

export default LeadgerDetails