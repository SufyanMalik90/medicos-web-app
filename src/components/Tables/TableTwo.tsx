import Image from "next/image";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import {api} from '@/axios'

const productData: Product[] = [
  {
    image: "/images/product/product-01.png",
    name: "Hammad ul haq",
    category: "Medical Assistant",
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: "/images/product/product-02.png",
    name: "Customer 2",
    category: "MPK",
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: "/images/product/product-03.png",
    name: "Customer 3",
    category: "MPK",
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: "/images/product/product-04.png",
    name: "Customer 4",
    category: "MPK",
    price: 499,
    sold: 72,
    profit: 103,
  },
  {
    image: "/images/product/product-04.png",
    name: "Customer 5",
    category: "MPK",
    price: 499,
    sold: 72,
    profit: 103,
  },
  {
    image: "/images/product/product-04.png",
    name: "Customer 6",
    category: "MPK",
    price: 499,
    sold: 72,
    profit: 103,
  },
  {
    image: "/images/product/product-04.png",
    name: "Customer 7",
    category: "MPK",
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const TableTwo = ({ customers }: any) => {
  // const [customers, setCustomers] = useState([]);
  // useEffect(() => {
  //   // Function to fetch customers
  //   const fetchCustomers = async () => {
  //     try {
  //       const response = await api.get("/api/get-all-customer");
  //       console.log("API Response:", response.data); // Log the response to inspect it

  //       // Check if the response was successful and if the customers array is present
  //       if (response.data.success && Array.isArray(response.data.customers)) {
  //         setCustomers(response.data.customers); // Set the customers array in state
  //       } else {
  //         console.error("Unexpected response format:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching customers:", error);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Customers
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke bg-[#5750f1] px-4 py-4.5 text-white dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Customer Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Address</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Complete Address</p>
        </div>
      </div>

      {customers.map((customer : any, key: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {customer.customer_name}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
            {customer.address.city}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
            {customer.address.complete_address ? customer.address.complete_address : "-"}
            </p>
          </div>
          {/* <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.sold}
            </p>
          </div> */}
          {/* <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-green">
              ${product.profit}
            </p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
