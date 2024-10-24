"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PurchaserRecovery from "@/components/Tables/PurchaserRecovery";
import { api } from "@/axios";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { use, useEffect, useRef, useState } from "react";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import AlertError from "@/components/Alerts/AlertError";
import OrderTable from "@/components/Tables/OrderTable";
import Pagination from "@/components/Pagination/pagination";
import OrderProductsTable from "@/components/orders/OrderProductTable";

const PurchaserRecords = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ledgers, setLedgers] = useState([]);
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
        const response = await api.get(`/api/get-purchaser-leadger`);
        console.log("API Response ledgers>>:", response.data); // Log the response to inspect it

        // Check if the response was successful
        if (response.data.success) {
         
          setLedgers(response.data.ledgers);
          // setPagesArr(createArray(response?.data?.totalPages));
          // setCurrent(response?.data?.currentPage);
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
 
  const [products, setproducts] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order Record" />
    
     <PurchaserRecovery ledgers={ledgers} setUpdate={setUpdate}/>
      
    </DefaultLayout>
  );
};

export default PurchaserRecords;
