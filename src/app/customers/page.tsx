"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import { api } from "../../axios.js";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useEffect, useRef, useState } from "react";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import AlertError from "@/components/Alerts/AlertError";

const TablesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef<any>();

  useEffect(() => {
    // Function to fetch customers
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/api/get-all-customer");
        console.log("API Response:", response.data); // Log the response to inspect it

        // Check if the response was successful and if the customers array is present
        if (response.data.success && Array.isArray(response.data.customers)) {
          const sortedCustomers = response.data.customers.sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setCustomers(sortedCustomers);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        
      }
    };

    fetchCustomers();
  }, []);

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
          city :formData.address,
          complete_address :formData.complete_address || null
        },
        phone: formData.phone || null
      });
      if (response?.data?.success) {
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
      {errorMessage && <AlertError title="Error" message={errorMessage} onClose={() => setErrorMessage("")}/>}
      {showSuccessAlert && <AlertSuccess title="New Customer Added" message="" onClose={() => setShowSuccessAlert(false)}/>}
      <div
        onClick={toggleModal}
        className={`fixed left-0 top-0 h-screen w-screen transition-all duration-500 ${
          isOpen ? "scale-1" : "scale-0"
        } flex items-center justify-center `}
      >
        <div
          ref={modalRef}
          className="flex h-auto w-full flex-col items-start justify-start gap-4 rounded-3xl bg-white p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-[rgb(2,13,26)] lg:w-[40rem]"
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
        <TableTwo customers={customers}/>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
