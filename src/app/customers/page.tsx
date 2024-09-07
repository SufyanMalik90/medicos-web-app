"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import axios from "axios";
import { api } from "../../axios.js";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useRef, useState } from "react";

const TablesPage = () => {
  const [isOpen, setIsOpen] = useState<any>(false);
  const modalRef = useRef<any>();

  const toggleModal = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  async function hitApi() {
    const response = await api.post("/create-product", {
      title: "Product-1",
      quantity: "2",
      price: "300",
    });
    if (response?.data?.success) {
      ("Do whatever you want.");
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer" />
      <div
        onClick={toggleModal}
        className={`fixed left-0 top-0 h-screen w-screen transition-all duration-500 ${isOpen ? "scale-1" : "scale-0"} flex items-center justify-center `}
      >
        <div
          ref={modalRef}
          className="flex h-auto w-full flex-col items-start justify-start gap-4 rounded-3xl  bg-white p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-[rgb(2,13,26)] lg:w-[40rem]"
        >
          <span className="text-2xl font-bold text-[#5750f1] dark:text-white">
            Create Customer
          </span>
          <input
            type="text"
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Full Name"
          />
          {/* <input
            type="text"
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Category"
          /> */}
          <input
            type="text"
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Address"
          />

          <button className="text-md flex h-14 w-full items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white outline-none">
            Create Customer
          </button>
        </div>
      </div>

      <div className="mb-3 flex h-12 w-full items-center justify-end ">
        <button
          onClick={() => setIsOpen((prev: any) => !prev)}
          className="flex h-12  w-40 items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white"
        >
          Create Customer
        </button>
      </div>
      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo />
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
