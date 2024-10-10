"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import { api } from "../../axios.js";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { use, useEffect, useRef, useState } from "react";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import AlertError from "@/components/Alerts/AlertError";
import Image from "next/image.js";

const TablesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef<any>();
  const [update, setUpdate] = useState<any>(false);

  const [page, setPage] = useState<any>(1);
  const [pagesArr, setPagesArr] = useState<any>([]);
  const [current, setCurrent] = useState<any>(1);
  function createArray(N: number) {
    let newArr = [];
    for (let i = 1; i <= N; i++) {
      newArr.push(i);
    }
    return newArr;
  }
  useEffect(() => {
    // Function to fetch customers
    const fetchCustomers = async () => {
      try {
        const response = await api.get(`/api/get-all-customer?page=${page}`);
        console.log("API Response:", response.data); // Log the response to inspect it

        // Check if the response was successful and if the customers array is present
        if (response.data.success && Array.isArray(response.data.customers)) {
          const sortedCustomers = response.data.customers.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setCustomers(sortedCustomers);
          setPagesArr(createArray(response?.data?.totalPages));
          setCurrent(response?.data?.currentPage);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [update]);

  // State to hold form inputs
  const [formData, setFormData] = useState({
    customer_name: "",
    address: "",
    complete_address: "",
    phone: "",
  });

  const toggleModal = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to send POST request
  async function hitApi() {
    try {
      const response = await api.post("/api/create-customer", {
        customer_name: formData.customer_name,
        address: {
          city: formData.address,
          complete_address: formData.complete_address || null,
        },
        phone: formData.phone || null,
      });
      if (response?.data?.success) {
        setUpdate((prev: any) => !prev);
        setShowSuccessAlert(true);
        setIsOpen(false);
        setErrorMessage("");
        // Hide the success alert after 3 seconds
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000); // Close the modal after successful creation
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      setErrorMessage(`Failed to create customer. ${error}`);
      setIsOpen(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer" />
      {errorMessage && (
        <AlertError
          title="Error"
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      {showSuccessAlert && (
        <AlertSuccess
          title="New Customer Added"
          message=""
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
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
            Create Customer
          </span>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Address"
          />
          <input
            type="text"
            name="complete_address"
            value={formData.complete_address}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Complete Address"
          />
          {/* <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Contact"
          /> */}

          <button
            onClick={hitApi}
            className="text-md flex h-14 w-full items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white outline-none"
          >
            Create Customer
          </button>
        </div>
      </div>

      <div className="mb-3 flex h-12 w-full items-center justify-end ">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-12 w-40 items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white"
        >
          Create Customer
        </button>
      </div>

      <div className="flex flex-col gap-10">
        {/* Conditional rendering for image or table */}
        {customers.length === 0 ? (
          <div className="flex w-full flex-col items-start justify-start py-4 lg:px-2">
            <div className="relative h-auto w-full overflow-x-auto ">
              <span className="flex h-auto w-full flex-col items-center justify-center py-4 text-3xl font-bold">
                <Image
                  src="/images/nothing.png"
                  alt="No customers found"
                  width={400}
                  height={300}
                  className="w-full md:w-1/2 lg:w-1/4"
                />
                Nothing here
              </span>
            </div>
          </div>
        ) : (
          <TableTwo customers={customers} />
        )}
      </div>

      {pagesArr && pagesArr.length > 0 && (
        <div className="mt-4 flex h-auto w-full items-center justify-end gap-2">
          <button
            disabled={current == 1}
            className={`text-md flex h-12 w-auto items-center justify-center rounded-xl border bg-white px-2 font-medium text-gray-700 shadow disabled:bg-gray-200`}
          >
            Back
          </button>
          {pagesArr.map((item: any, key: number) => {
            return (
              <button
                key={key}
                className={`h-12 w-12  ${
                  current == key + 1 ? "bg-gray-200" : "bg-white"
                } text-md flex items-center justify-center rounded-xl border font-medium text-gray-700 shadow`}
              >
                {key + 1}
              </button>
            );
          })}
          <button
            disabled={current == pagesArr.length}
            className={`text-md flex h-12 w-auto items-center justify-center rounded-xl border bg-white px-2 font-medium text-gray-700 shadow disabled:bg-gray-200`}
          >
            Next
          </button>
        </div>
      )}
    </DefaultLayout>
  );
};

export default TablesPage;
