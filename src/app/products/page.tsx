"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import { api } from "../../axios.js";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useEffect, useRef, useState } from "react";
import  AlertError  from "@/components/Alerts/AlertError";
import  AlertSuccess  from "@/components/Alerts/AlertSuccess";

const TablesPage = () => {
  const [isOpen, setIsOpen] = useState<any>(false);
  const [products, setproducts] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [update, setUpdate] = useState<any>(false);

  const modalRef = useRef<any>();
  useEffect(() => {
    // Function to fetch customers
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/api/get-all-products");
        console.log("API Response:", response.data); // Log the response to inspect it

        // Check if the response was successful and if the customers array is present
        if (response.data.success && Array.isArray(response.data.products)) {
          const sortedproducts = response.data.products.sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setproducts(sortedproducts);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        
      }
    };

    fetchCustomers();
  }, [update]);
  const toggleModal = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  // State to hold form inputs
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    stock: "",
  });

   // Handle input changes
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Convert the value to a number if the input name is 'price' or 'stock'
    const numericValue = name === "price" || name === "stock" ? Number(value) : value;
  console.log("numericValue",numericValue);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: numericValue,
    }));
  };

 // API call to add the product
 async function hitApi() {
  
  try {
    const response = await api.post("/api/create-product", {
      product_name: formData.product_name,
      price: formData.price,
      stock: formData.stock,
    });

    if (response?.data?.success) {
      setUpdate((prev: any) => !prev);
      setShowSuccessAlert(true);
      setIsOpen(false);
      setErrorMessage("");
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } else {
      console.log("response?.data?.message",response?.data?.message);
      
      setErrorMessage(response?.data?.message || "Failed to create product.");
      setIsOpen(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  } catch (error: any) {
    console.error("Error creating product:", error);
    setErrorMessage(`Failed to create product.`);
    setIsOpen(false);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
}
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      {errorMessage && <AlertError title="Error" message={errorMessage} onClose={() => setErrorMessage("")}/>}
      {showSuccessAlert && <AlertSuccess title="New Product Added" message="" onClose={() => setShowSuccessAlert(false)}/>}
      <div
        onClick={toggleModal}
        className={`fixed left-0 top-0 h-screen w-screen transition-all duration-500 ${isOpen ? "scale-1" : "scale-0"} flex items-center justify-center `}
      >
        <div
          ref={modalRef}
          className="flex h-auto w-full flex-col items-start justify-start gap-4 rounded-3xl  bg-white p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-[rgb(2,13,26)] lg:w-[40rem]"
        >
          <span className="text-2xl font-bold text-[#5750f1] dark:text-white">
            Add Product
          </span>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Title"
          />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Price"
          />
          <input
            type="text"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Quantity"
          />

          <button onClick={hitApi} className="text-md flex h-14 w-full items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white outline-none">
            Add Product
          </button>
        </div>
      </div>

      <div className="mb-3 flex h-12 w-full items-center justify-end ">
        <button
          onClick={() => setIsOpen((prev: any) => !prev)}
          className="flex h-12  w-40 items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white"
        >
          Add Product
        </button>
      </div>

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        {/* <TableTwo /> */}
        <TableThree products= {products}/>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
