"use client"
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { api } from "@/axios"; // Assuming you have an API setup
import Spinners from "../Spinners/Spinners";


const ProductSaleTable = () => {
  const [product, setProducts] = useState([]); // API fetched products
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [highlightedCustomerIndex, setHighlightedCustomerIndex] = useState(-1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const customerRefs = useRef([]);
  const [searchProduct, setSearchProduct] = useState({
    product_id : "",
    customerName: '',
  });

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/api/all-products`);
        if (response.data.success && Array.isArray(response.data.products)) {
          const sortedProducts = response.data.products.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setProducts(sortedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const contentRef = useRef(null); // Ensure correct typing of the ref

  const handlePrint = useReactToPrint({ contentRef });

  const handleCustomerSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchProduct({ ...searchProduct, customerName: query });

    if (query.length > 0) {
      const filtered = product.filter((customer) =>
        customer.product_name.toLowerCase().includes(query),
      );
      setFilteredCustomers(filtered);
      setShowDropdown(true); // Show dropdown when searching
    } else {
      setFilteredCustomers(product);
      setShowDropdown(false); // Hide dropdown if input is empty
    }
  };
const handleCustomerSelect = (customerName, product_id) => {
    setSearchProduct({ ...searchProduct, customerName, product_id });
    setShowDropdown(false); // Hide dropdown after selection
    setHighlightedCustomerIndex(-1); // Reset highlighted index
  };

  const handleCustomerKeyDown = (e) => {
    const customersLength = filteredCustomers.length;
  
    if (e.key === 'ArrowDown') {
      // Move down in the list
      setHighlightedCustomerIndex((prevIndex) =>
        prevIndex < customersLength - 1 ? prevIndex + 1 : 0
      );
      e.preventDefault(); // Prevent default scrolling behavior
    } else if (e.key === 'ArrowUp') {
      // Move up in the list
      setHighlightedCustomerIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : customersLength - 1
      );
      e.preventDefault(); // Prevent default scrolling behavior
    } else if (e.key === 'Enter') {
      // Select the highlighted customer
      if (highlightedCustomerIndex >= 0 && highlightedCustomerIndex < customersLength) {
        handleCustomerSelect(
          filteredCustomers[highlightedCustomerIndex].product_name,
          filteredCustomers[highlightedCustomerIndex]._id
        );
      }
    } else if (e.key === 'Escape') {
      // Close the dropdown
      setShowDropdown(false);
      setHighlightedCustomerIndex(-1);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);
  
    try {
      const response = await api.post('/api/product-wise-sale', {
        product_id : searchProduct.product_id
      });
      if (response.data.success) {
        setData(response.data);
        // console.log("Invoice created successfully:", response.data);
       
      } else {
        console.error("Error getting data:", response.data.message);
        // toast.error("Something went Wrong!")
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
      // alert(error.response.data.message)
      // toast.error("Something went Wrong!")
      // alert("Something went Wrong")
    }finally {
      setLoading(false); // Stop loading spinner
    }
  };
  useEffect(() => {
    if (highlightedCustomerIndex >= 0 && customerRefs.current[highlightedCustomerIndex]) {
      customerRefs.current[highlightedCustomerIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [highlightedCustomerIndex]);
  
  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
      {/* Product Name Header */}
      <div className="mb-4 flex justify-between">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchProduct.customerName}
            onChange={handleCustomerSearch}
            onKeyDown={handleCustomerKeyDown}
            className="w-40 rounded-md border px-3 py-2 text-center font-bold focus:outline-none dark:bg-gray-800 dark:text-white"
            placeholder="Select product"
            onBlur={() => setShowDropdown(false)} // Hide dropdown on blur
            onFocus={() => searchProduct.customerName && setShowDropdown(true)} // Show dropdown when input focused
          />

          {/* Dropdown for filtered customer results */}
          {showDropdown && (
            <ul className="absolute max-h-30 w-39 overflow-y-auto rounded-sm border bg-white dark:bg-gray-800 dark:text-white">
              {filteredCustomers.map((customer, idx) => (
                <li
                  key={customer._id}
                  ref={(el) => (customerRefs.current[idx] = el)}
                  className={`cursor-pointer p-2 ${
                    highlightedCustomerIndex === idx
                      ? "bg-gray-200 dark:bg-gray-600"
                      : ""
                  } hover:bg-gray-200 dark:hover:bg-gray-600`}
                  onMouseDown={() =>
                    handleCustomerSelect(customer.product_name, customer._id)
                  }
                >
                  {customer.product_name}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="rounded-lg bg-[#5750f1] px-4 py-2 text-white transition hover:bg-blue-700 md:block "
            disabled={loading}
          >
            {loading ? <Spinners /> : "Apply"} {/* Toggle spinner */}
          </button>
        </div>
        {/* {data && data.customerSummary.length > 0 && (
          <button
            type="button"
            onClick={() => handlePrint()}
            className="hidden rounded-lg bg-[#5750f1] px-4 py-2 text-white transition hover:bg-blue-700 md:block"
          >
            Print Sale Sheet
          </button>
        )} */}
      </div>
      {data && (
        <div ref={contentRef}>
          <div className="my-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Product Name: {data.product_name}
            </h4>
          </div>

          {/* Data List */}
          <div className="overflow-x-auto my-8">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              {/* Table Head */}
              <thead className="bg-gray-700 font-medium uppercase text-gray-300">
                <tr className="rounded-2xl bg-gray-200 shadow-md dark:bg-gray-700">
                  <th
                    scope="col"
                    className="px-4 py-2 text-dark dark:text-white"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-dark  dark:text-white"
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-dark dark:text-white"
                  >
                    Quantity
                  </th>
                  {/* Extra columns for larger screens */}
                  <th
                    scope="col"
                    className="px-4 py-2 text-dark dark:text-white"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-dark dark:text-white"
                  >
                    Total
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.customerSummary.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-600 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                  >
                    <td className="px-4 py-2 font-medium text-dark dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 font-medium text-dark dark:text-white">
                      {" "}
                      {item.customer_name}
                    </td>
                    <td className="px-4 py-2 font-medium text-dark dark:text-white ">
                      {item.total_purchased}
                    </td>
                    <td className="px-4 py-2 font-medium text-dark dark:text-white ">
                      {item.price}
                    </td>
                    <td className="px-4 py-2 font-medium text-dark dark:text-white ">
                      {item.total_sale_amount}
                    </td>
                    {/* Extra data for larger screens */}
                    {/* <td className="px-4 py-2 font-medium text-dark dark:text-white">{item.price}</td>
          <td className="px-4 py-2 font-medium text-dark dark:text-white">{item.total}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <div className="text-dark dark:text-white text-end mr-2">Net-Total: {data.net_amount}</div>
        </div>
      )}
    </div>
  );
}

export default ProductSaleTable