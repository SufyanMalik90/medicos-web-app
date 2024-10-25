import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { api } from "../../axios.js";

const ConfirmModalCustomer = ({ isOpen, onClose, customerId , setUpdate}) => {
  if (!isOpen) return null;
  

  async function handleDeleteInvoice() {
    try {
      const response = await api.delete("/api/delete-customer", {
        data: {
          customer_id: customerId,
        },
      });
  
      if (response?.data?.success) {
        toast.success('Customer Deleted Successfully!');
        setUpdate((prev) => !prev);

        onClose();
      } else {
        console.log("response?.data?.message", response?.data?.message);
        toast.error(response?.data?.message || "Failed to delete the customer.");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      onClose();
      toast.error("Failed to delete the customer.");
    }
  }
  

  return (
    <div className="fixed inset-0 z-[1000] flex h-full w-full flex-wrap items-center justify-center overflow-auto p-4 font-[sans-serif] before:fixed before:inset-0 before:h-full before:w-full before:bg-[rgba(0,0,0,0.5)]">
      <div className="relative w-full max-w-lg  rounded-lg bg-white p-4 shadow-lg">
        <svg
          onClick={onClose} // Close the modal when the close icon is clicked
          xmlns="http://www.w3.org/2000/svg"
          className="float-right w-3 shrink-0 cursor-pointer fill-gray-400 hover:fill-red-500"
          viewBox="0 0 320.591 320.591"
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          ></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          ></path>
        </svg>

        <div className="my-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-14 fill-red-500"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
              data-original="#000000"
            />
            <path
              d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
              data-original="#000000"
            />
          </svg>
          <h4 className="mt-4 text-lg font-semibold text-gray-800">
            Are you sure you want to delete customer?
          </h4>
        </div>

        <div className="flex gap-2 justify-end">
         
          <button
            type="button"
            onClick={onClose} // Close the modal when the Cancel button is clicked
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm tracking-wide text-gray-800 hover:bg-gray-300 active:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteInvoice}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm tracking-wide text-white hover:bg-red-600 active:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalCustomer;
