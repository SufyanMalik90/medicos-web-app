"use client";
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { api } from "../../axios.js";
import { useRouter } from "next/navigation";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import Pagination from "../Pagination/pagination";
import Spinners from "../Spinners/Spinners";
import toast, { Toaster } from 'react-hot-toast';

const TableOne = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false); // State for filter dropdown
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [searchInvoice, setSearchInvoice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<any>();
  const [loading, setLoading] = useState(false); // Add loading state
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(false); 

  const [filter, setFilter] = useState({
    startDate : "",
    endDate : ""
  })
  const router = useRouter();
  const [update, setUpdate] = useState<any>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchLastInvoices = async (page: number) => {
    try {
      const response = await api.get("/api/get-all-invoices");
      console.log("API Response Invoices:", response.data);

      if (response.data.success && Array.isArray(response.data.invoice)) {
        const sortedProducts = response.data.invoice.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setInvoices(sortedProducts);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);

      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchLastInvoices(currentPage);
  }, [update,currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const toggleModal = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  const handleViewDetails = (invoice_no: string) => {
    console.log("invoices >>", invoice_no);
    router.push(`/invoices/${invoice_no}`);
  };

  const handleDeleteInvoice = (invoice_no: string) => {
    setIsModalOpen(true)
    setInvoiceNo(invoice_no)
    
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePageChange = (newPage: number) => {
    console.log("newPage>>", newPage);
    
    setCurrentPage(newPage);
  };
  const filteredInvoices = invoices.filter((invoice: any) =>
    // invoice.customer_id.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  // seaarch by invoice number
  invoice.invoice_number.toString().includes(searchTerm)
  );

  const toggleFilterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleClearFilter = () => {
    setIsFilterOpen(false);

    // Reset the filter state
    setFilter({
      startDate: "",
      endDate: "",
    });
    fetchLastInvoices(1);
  };

  const handleApply = async () => {
    try {
      const response = await api.post("/api/filter-invoice-by-date", {
        from_date: filter.startDate,
        to_date: filter.endDate
      });
      console.log("Filtered Invoices Response:", response.data);
  
      if (response.data.success && Array.isArray(response.data.invoices)) {

        const sortedInvoices = response.data.invoices.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setInvoices(sortedInvoices);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching filtered invoices:", error);
    } finally{
      setIsFilterOpen(false);

    }
  };

  const findInvoice = async () => {
    setLoading(true);
    try {
      let invoiceSearch = [];
      const response = await api.post("/api/invoice-details-by-number", {
        invoice_number : searchInvoice
      });
  
      if (response.data.success) {
        invoiceSearch.push(response.data.invoice)
        setInvoices(invoiceSearch);
        setIsSearchSuccessful(true);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching search invoice:", error);
      toast.error("No Invoice found!")
    } finally{
      setIsOpen(false);
      setSearchInvoice("")
      setLoading(false)

    }
  };
  const clearSearch = () => {
    setSearchInvoice("");
    fetchLastInvoices(1)
    setIsSearchSuccessful(false);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        onClick={toggleModal}
        className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center transition-all duration-500 ${
          isOpen ? "scale-1" : "scale-0"
        }`}
      >
        <div
          ref={modalRef}
          className="flex h-auto w-full max-w-lg flex-col items-start justify-start gap-4 rounded-3xl bg-white p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-[rgb(2,13,26)] lg:w-[40rem]"
        >
          <span className="text-2xl font-bold text-[#5750f1] dark:text-white">
            Search Invoice
          </span>
          <input
            type="number"
            name="invoice_number"
            value={searchInvoice}
            onChange={(e) => setSearchInvoice(e.target.value)}
            // onKeyDown={(e) => e.key === "Enter" && createPurchaser()}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Invoice number"
          />

          <button
            onClick={findInvoice}
            className="text-md flex h-14 w-full items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white outline-none"
          >
            {loading ? <Spinners /> : "Find Invoice"}
          </button>
        </div>
      </div>

      <div className="flex h-12 w-full items-center justify-end">
        {isSearchSuccessful ? (
          <button
            onClick={clearSearch}
            className="flex h-12 w-40 items-center justify-center gap-2 rounded-lg bg-[#5750f1] font-medium text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              />
            </svg>
            Clear
          </button>
        ) : (
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-12 w-40 items-center justify-center gap-2 rounded-lg bg-[#5750f1] font-medium text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              />
            </svg>
            Find Invoice
          </button>
        )}
      </div>

      <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="mb-3 flex items-start justify-between">
          <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
            Last Invoices
          </h4>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search invoice..."
                className="rounded-lg border-2 bg-white py-2 pl-10 pr-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-none dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={handleSearch}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search absolute left-3 top-2.5 text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <div className="relative">
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md shadow-md dark:bg-gray-200"
                onClick={toggleFilterDropdown}
              >
                <svg
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_4926_11631"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="49"
                    height="49"
                  >
                    <rect width="49" height="49" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_4926_11631)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.3748 24.2886C20.3997 24.3108 20.4232 24.3316 20.4468 24.3565C21.9408 25.8879 22.7646 27.9163 22.7646 30.0694V35.5857L25.8606 33.8993C26.1043 33.7663 26.2552 33.506 26.2552 33.2194V30.0528C26.2552 27.908 27.0708 25.8865 28.5509 24.3634L35.2483 17.2396C35.6817 16.7785 35.9199 16.1734 35.9199 15.5351V14.2391C35.9199 13.5966 35.4131 13.0746 34.7928 13.0746H14.2022C13.5805 13.0746 13.0737 13.5966 13.0737 14.2391V15.5351C13.0737 16.1734 13.3119 16.7785 13.7452 17.2382L20.3748 24.2886ZM22.2791 38.0014C21.9994 38.0014 21.7225 37.9266 21.4705 37.7771C20.9831 37.4863 20.6909 36.9726 20.6909 36.4022V30.0717C20.6909 28.5002 20.1052 27.02 19.0377 25.886C19.0058 25.8597 18.974 25.8306 18.9463 25.8002L12.2365 18.6652C11.4389 17.8178 11 16.706 11 15.5374V14.2414C11 12.4538 12.4386 11 14.2054 11H34.796C36.5614 11 38 12.4538 38 14.2414V15.5374C38 16.7046 37.5611 17.8151 36.7663 18.6638L30.0551 25.8002C28.9432 26.9466 28.3354 28.4545 28.3354 30.0551V33.2217C28.3354 34.2685 27.7691 35.2266 26.858 35.7251L23.0351 37.8075C22.7969 37.9363 22.538 38.0014 22.2791 38.0014V38.0014Z"
                      fill="#C1C7C9"
                    />
                  </g>
                </svg>
              </div>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-md bg-white p-4 shadow-lg dark:bg-gray-900">
                  <h4 className="mb-2 text-lg font-bold text-black dark:text-white">
                    Filter Invoices
                  </h4>
                  <hr />
                  {/* <DatePickerOne label="From Date"/> */}
                  <div className="my-2 mb-4">
                    <label className="mb-1 block text-sm font-bold text-black dark:text-white">
                      From Date
                    </label>
                    <div className="flex items-center rounded-md border bg-gray-100 p-2 dark:border-none dark:bg-gray-800">
                      <input
                        type="date"
                        value={filter.startDate}
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            startDate: e.target.value,
                          }));
                          console.log(e.target.value);
                        }}
                        className="flex-1 bg-gray-100 align-bottom outline-none dark:bg-gray-800"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-bold text-black dark:text-white">
                      To Date
                    </label>
                    <div className="flex items-center rounded-md border bg-gray-100 p-2 dark:border-none dark:bg-gray-800">
                      <input
                        type="date"
                        value={filter.endDate}
                        onChange={(e) => {
                          setFilter((prevFilter) => ({
                            ...prevFilter,
                            endDate: e.target.value,
                          }));
                          console.log(e.target.value);
                        }}
                        className="flex-1 bg-gray-100 outline-none dark:bg-gray-800"
                        placeholder="MM/DD/YYYY"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-2">
                    <button
                      className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-500"
                      onClick={handleClearFilter}
                    >
                      Clear
                    </button>
                    <button
                      className=" w-full rounded-md bg-[#5750f1] px-4 py-2 text-white"
                      onClick={handleApply}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {filteredInvoices.length > 0 ? (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-5">
                <div className="px-2 pb-3.5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Invoice #
                  </h5>
                </div>
                <div className="px-2 pb-3.5 text-center">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Customer
                  </h5>
                </div>
                <div className="px-2 pb-3.5 text-center">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Amount
                  </h5>
                </div>
              </div>

              {filteredInvoices.map((invoice: any, key: number) => (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-5 ${
                    key === invoices.length - 1
                      ? ""
                      : "border-b border-stroke dark:border-dark-3"
                  }`}
                  key={key}
                >
                  <div className="flex items-center gap-3.5 px-2 py-4">
                    <p className="font-medium text-dark dark:text-white sm:block">
                      {invoice.invoice_number}
                    </p>
                  </div>

                  <div className="flex items-center justify-start px-2 py-4">
                    <p className="font-medium text-dark dark:text-white">
                      {invoice.customer_id.customer_name}
                    </p>
                  </div>

                  <div className="flex items-center justify-center px-2 py-4">
                    <p className="font-medium text-green-light-1">
                      {" "}
                      {invoice.total}
                    </p>
                  </div>

                  <ConfirmModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    invoiceNo={invoiceNo}
                    setUpdate={setUpdate}
                  />
                  <div className="col-span-1 flex items-center">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="hover:text-blue-700"
                        onClick={() =>
                          handleViewDetails(invoice.invoice_number)
                        }
                      >
                        <Image
                          alt="view-icon"
                          src="/images/icon/view.svg"
                          width={20}
                          height={20}
                          className="text-green-900"
                        />
                      </button>
                      <button
                        className="hover:text-blue-700"
                        onClick={() =>
                          handleDeleteInvoice(invoice.invoice_number)
                        }
                      >
                        <Image
                          alt="delete-icon"
                          src="/images/icon/trash.svg"
                          width={20}
                          height={20}
                          className="text-green-900"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <Image
                alt="no-data"
                src="/images/nothing.png"
                width={300}
                height={300}
              />
              <p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
                No invoices found.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TableOne;
