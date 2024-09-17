"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import { api } from "../../axios.js";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { use, useEffect, useRef, useState } from "react";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import AlertError from "@/components/Alerts/AlertError";
import OrderTable from "@/components/Tables/OrderTable";
import Pagination from "@/components/Pagination/pagination";
import OrderProductsTable from "@/components/orders/OrderProductTable";

const TablesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
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
        const response = await api.get(`/api/get-all-orders?page=${page}`);
        console.log("API Response Orders>>:", response.data); // Log the response to inspect it

        // Check if the response was successful and if the customers array is present
        if (response.data.success && Array.isArray(response.data.orders)) {
          const sortedCustomers = response.data.orders.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setOrders(sortedCustomers);
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
      const response = await api.post("/api/create-order", {
        party_name: formData.customer_name,
        products: [
          {
            product_id: "66e808a68cfe094dc66958d6",
            quantity: 10,
            amount: 2500,
          },
        ],
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
  const [products, setproducts] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // Function to fetch customers
    const fetchProducts = async (page: number) => {
      try {
        const response = await api.get(`/api/get-all-products?page=${page}`);
        console.log("API Response:", response.data); // Log the response to inspect it

        // Check if the response was successful and if the customers array is present
        if (response.data.success && Array.isArray(response.data.products)) {
          const sortedproducts = response.data.products.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setproducts(sortedproducts);
          setTotalPages(response.data.totalPages || 1);
          setCurrentPage(response.data.currentPage || 1);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchProducts(currentPage);
  }, [currentPage]);

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />
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
        className={`fixed left-0 top-0 z-[1000] h-screen w-screen transition-all duration-500 ${
          isOpen ? "scale-1" : "scale-0"
        } flex items-center justify-center `}
      >
        <div
          ref={modalRef}
          className="flex h-auto w-full flex-col items-start justify-start gap-4 rounded-3xl    bg-white p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-[rgb(2,13,26)] lg:w-[40rem]"
        >
          <span className="text-2xl font-bold text-[#5750f1] dark:text-white">
            Create Order
          </span>
          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Party Name"
          />

          {/* <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Contact"
          /> */}

          <div className="h-[60vh]  w-full overflow-y-auto pr-1 ">
            <OrderProductsTable products={products} />
          </div>

          <button
            onClick={hitApi}
            className="text-md flex h-14 w-full items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white outline-none"
          >
            Create New
          </button>
        </div>
      </div>

      <div className="mb-3 flex h-12 w-full items-center justify-end ">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-12 w-40 items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white"
        >
          Create New Order
        </button>
      </div>
      <div className="flex flex-col gap-10">
        
        <OrderTable orders={orders} />
      </div>

      {/* <div className="mt-4 flex h-auto w-full items-center justify-end gap-2">
        <button
          disabled={current == 1}
          className={`text-md flex h-12 w-auto items-center justify-center rounded-xl border bg-white px-2 font-medium text-gray-700 shadow disabled:bg-gray-200`}
        >
          Back
        </button>
        {pagesArr?.map((item: any, key: number) => {
          return (
            <button
              key={key}
              className={`h-12 w-12  ${current == key + 1 ? "bg-gray-200" : "bg-white"} text-md flex items-center justify-center rounded-xl border font-medium text-gray-700 shadow`}
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
      </div> */}
      
    </DefaultLayout>
  );
};

export default TablesPage;
