"use client";
import { useState, useEffect, useRef } from "react";
import { api } from "@/axios"; // Assuming you have an API setup
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';


const CreateInvoice = () => {
  const [products, setProducts] = useState<any>([]); // API fetched products
  const [customers, setcustomer] = useState<any>([]); // API fetched products
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState<any>([]);
  const [stockAvailable, setStockAvailable] = useState<string | null>(null);
  const [stockQty, setStockQty] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [highlightedCustomerIndex, setHighlightedCustomerIndex] = useState<number>(-1);

  const router = useRouter()

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/api/all-products`);
        if (response.data.success && Array.isArray(response.data.products)) {
          const sortedProducts = response.data.products.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setProducts(sortedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchCustomer = async () => {
      try {
        const response = await api.get(`/api/get-all-customer`);
        if (response.data.success && Array.isArray(response.data.customers)) {
          const sortedProducts = response.data.customers.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setcustomer(sortedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchCustomer();
  }, []);

  const [invoice, setInvoice] = useState({
    customer_id : "",
    customerName: '',
    products: [
      { product_id: '', productName: '', quantity: 0, rate: 0, discount: 0, total: 0, filteredProducts: [] }
    ],
    issueDate: '',
    dueDate: '',
  });

  // Refs for each input field
  const productRefs = useRef<Array<any>>([]);

  // Function to add a new product row
  const addProduct = () => {
    setStockQty("");
    setInvoice({
      ...invoice,
      products: [
        ...invoice.products,
        { product_id: '', productName: '', quantity: 0, rate: 0, discount: 0, total: 0, filteredProducts: [] }
      ]
    });
  };

  // Function to update product details
  const updateProduct = (index: number, field: string, value: any) => {
    const product: any = invoice.products[index];
    const apiProduct = products.find((p: { _id: any }) => p._id === product.product_id);
    
    if (field === 'quantity' && apiProduct) {
      // Calculate the total quantity of the same product in the invoice
      const totalExistingQuantity = invoice.products
        .filter((p: any, i: number) => p.product_id === product.product_id && i !== index)
        .reduce((sum: number, p: any) => sum + p.quantity, 0);
      
      // Calculate the remaining stock after considering the existing quantities
      const remainingStock: any = apiProduct.stock - totalExistingQuantity - value;
      
      if (value > apiProduct.stock - totalExistingQuantity) {
        setStockAvailable(`Stock available ${apiProduct.stock - totalExistingQuantity}`);
      } else {
        setStockAvailable(null); // Clear the error if quantity is valid
      }
      // Update stockQty to show the remaining stock
      setStockQty(remainingStock);
    }
  
    const newProducts = invoice.products.map((product, i) =>
      i === index
        ? { 
            ...product, 
            [field]: value,
            total: (field === 'quantity' ? value : product.quantity) * (field === 'rate' ? value : product.rate) - product.discount 
          }
        : product
    );
    setInvoice({ ...invoice, products: newProducts });
  };

  // Filter products based on the search input for a specific row
  const handleProductSearch = (searchValue: string, index: number) => {
    const updatedProducts = invoice.products.map((product, i) => {
      if (i === index) {
        const filtered = searchValue
          ? products.filter((p: any) =>
              p.product_name.toLowerCase().includes(searchValue.toLowerCase())
            )
          : [];
        return { ...product, productName: searchValue, filteredProducts: filtered };
      }
      return product;
    });

    setInvoice({ ...invoice, products: updatedProducts });
  };

  const handleProductSelect = (selectedProduct: any, index: number) => {
    // Calculate total existing quantity of the selected product in the invoice
    const totalExistingQuantity : any = invoice.products
      .filter((p: any, i: number) => p.product_id === selectedProduct._id && i !== index)
      .reduce((sum: number, p: any) => sum + p.quantity, 0);
  
    // Set the remaining stock
    setStockQty((selectedProduct.stock - totalExistingQuantity).toString());
  
    const updatedProducts = invoice.products.map((product, i) =>
      i === index
        ? { ...product, product_id: selectedProduct._id, productName: selectedProduct.product_name, rate: selectedProduct.price, filteredProducts: [] }
        : product
    );

    setInvoice({ ...invoice, products: updatedProducts });
    setHighlightedIndex(-1); // Reset highlighted index
  
    // Move focus to the T.P (rate) field after selecting the product
    setTimeout(() => {
      if (productRefs.current[index] && productRefs.current[index]["rate"]) {
        productRefs.current[index]["rate"].focus();
      }
    }, 100);
  };

  const handleKeyDownProductSelect = (e: React.KeyboardEvent<HTMLInputElement>, index: number, field: string) => {
    
    const filteredLength = invoice.products[index].filteredProducts.length;
  
    if (e.key === 'ArrowDown') {
      // Move down in the list
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredLength - 1 ? prevIndex + 1 : 0
      );
      e.preventDefault(); // Prevent default scrolling behavior
    } else if (e.key === 'ArrowUp') {
      // Move up in the list
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredLength - 1
      );
      e.preventDefault(); // Prevent default scrolling behavior
    } else if (e.key === 'Enter') {
      // Select the highlighted item
      if (highlightedIndex >= 0 && highlightedIndex < filteredLength) {
        handleProductSelect(invoice.products[index].filteredProducts[highlightedIndex], index);
      }
    } else if (e.key === 'Escape') {
      // Close the dropdown
      setHighlightedIndex(-1);
    }
  };
  
  

  const handleKeyDown = (e: any, index: number, field: string) => {
    if (e.key === "Enter") {
      switch (field) {
        case "productName":
          if (productRefs.current[index] && productRefs.current[index]["rate"]) {
            productRefs.current[index]["rate"].focus();
          }
          break;
        case "rate":
          if (productRefs.current[index] && productRefs.current[index]["quantity"]) {
            productRefs.current[index]["quantity"].focus();
          }
          break;
        case "quantity":
          if (productRefs.current[index] && productRefs.current[index]["discount"]) {
            productRefs.current[index]["discount"].focus();
          }
          break;
        case "discount":
          // If Enter is pressed on the discount field, add a new product
          addProduct();
  
          // Move focus to the next product's productName field after a delay
          setTimeout(() => {
            const nextIndex = index + 1;
            if (productRefs.current[nextIndex] && productRefs.current[nextIndex]["productName"]) {
              productRefs.current[nextIndex]["productName"].focus();
            }
          }, 100); // Allow time for the new product to be added to state
          break;
        default:
          break;
      }
    }
  };
  

  const totalAmount = invoice.products.reduce((total, product) => {
    return total + (product.rate * product.quantity - product.discount);
  }, 0);

  // Filter customers based on input
  const handleCustomerSearch = (e: any) => {
    const query = e.target.value.toLowerCase();
    setInvoice({ ...invoice, customerName: query });

    if (query.length > 0) {
      const filtered = customers.filter((customer: any) =>
        customer.customer_name.toLowerCase().includes(query),
      );
      setFilteredCustomers(filtered);
      setShowDropdown(true); // Show dropdown when searching
    } else {
      setFilteredCustomers(customers);
      setShowDropdown(false); // Hide dropdown if input is empty
    }
  };
  const handleCustomerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          filteredCustomers[highlightedCustomerIndex].customer_name,
          filteredCustomers[highlightedCustomerIndex]._id
        );
      }
    } else if (e.key === 'Escape') {
      // Close the dropdown
      setShowDropdown(false);
      setHighlightedCustomerIndex(-1);
    }
  };
  
  // Handle customer selection
  const handleCustomerSelect = (customerName: string, customer_id: string) => {
    setInvoice({ ...invoice, customerName, customer_id });
    setShowDropdown(false); // Hide dropdown after selection
    setHighlightedCustomerIndex(-1); // Reset highlighted index
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("invoice======", invoice);
    
    // Prepare the data for the API by excluding unnecessary fields like 'customerName' and 'productName'
    const apiInvoiceData = {
      customer_id: invoice.customer_id,
      products: invoice.products.map((product) => ({
        product_id: product.product_id,
        quantity: product.quantity,
        rate: product.rate,
        discount: product.discount
      })),
      issue_date: new Date().toISOString().slice(0, 10),
      due_date: new Date().toISOString().slice(0, 10),
    };
  
    console.log("Prepared API data:", apiInvoiceData);
  
    try {
      const response = await api.post('/api/create-invoice', apiInvoiceData);
      if (response.data.success) {
        // console.log("Invoice created successfully:", response.data);
        if (response.data.invoice.invoice_number) {
          router.replace(`/invoices/${response.data.invoice.invoice_number}`);
        toast.success('Invoice Created!')
        }
       

        // router.push('/invoices')

        // Handle successful invoice creation (e.g., show success message, redirect, etc.)
      } else {
        console.error("Error creating invoice:", response.data.message);
        toast.error("Something went Wrong!")
      }
    } catch (error:any) {
      console.error("Error submitting invoice:", error);
      // alert(error.response.data.message)
      toast.error("Something went Wrong!")
      // alert("Something went Wrong")
    }
  };
  

  return (
    <DefaultLayout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto rounded-lg bg-white p-6 shadow-1 dark:bg-gray-dark">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-white">
          Sale Invoice
        </h2>

        {/* Customer and Date Information */}
        <div className="mb-4 flex justify-between">
          <div>
            <label className="mb-2 block text-sm font-medium dark:text-white">
              Customer Name
            </label>
            <input
              type="text"
              value={invoice.customerName}
              onChange={handleCustomerSearch}
              onKeyDown={handleCustomerKeyDown}
              className="w-40 rounded-md border px-3 py-2 text-center font-bold focus:outline-none dark:bg-gray-800 dark:text-white"
              placeholder="Select customer"
              onBlur={() => setShowDropdown(false)} // Hide dropdown on blur
              onFocus={() => invoice.customerName && setShowDropdown(true)} // Show dropdown when input focused
            />

            {/* Dropdown for filtered customer results */}
            {showDropdown && (
              <ul className="absolute w-39 rounded-sm border bg-white dark:bg-gray-800 dark:text-white">
                {filteredCustomers.map((customer: any, idx: number) => (
                  <li
                    key={customer._id}
                    className={`cursor-pointer p-2 ${
                      highlightedCustomerIndex === idx
                        ? "bg-gray-200 dark:bg-gray-600"
                        : ""
                    } hover:bg-gray-200 dark:hover:bg-gray-600`}
                    onMouseDown={() =>
                      handleCustomerSelect(customer.customer_name, customer._id)
                    }
                  >
                    {customer.customer_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col items-baseline gap-1">
            <div className="flex items-baseline gap-1">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
                Supply Date:{" "}
              </label>
              {new Date().toISOString().slice(0, 10)}
            </div>
            {stockQty && (
              <p className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
                Available QTY: {stockQty}
              </p>
            )}
            {/* <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) =>
                setInvoice({ ...invoice, dueDate: e.target.value })
              }
              className="h-7 w-40 rounded-md border border-none px-3 py-2 dark:bg-gray-800 dark:text-white"
            /> */}
          </div>
        </div>

        {/* Product Table */}
        <table className="min-w-full dark:bg-gray-700">
          <thead>
            <tr className="rounded-2xl bg-gray-100 shadow-md dark:bg-gray-800">
              <th className="px-4 py-2 dark:text-white">Product Name</th>
              <th className="px-4 py-2 dark:text-white">T.P</th>
              <th className="px-4 py-2 dark:text-white">Quantity</th>
              <th className="px-4 py-2 dark:text-white">Amount</th>
              <th className="px-4 py-2 dark:text-white">Discount (%)</th>
              <th className="px-4 py-2 dark:text-white">Dis-Amount</th>
              <th className="px-4 py-2 dark:text-white">N-Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((product: any, index: any) => {
              const amount = product.rate * product.quantity;
              const discountAmount = (amount * product.discount) / 100;
              const netTotal = amount - discountAmount;

              return (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={product.productName}
                      onChange={(e) =>
                        handleProductSearch(e.target.value, index)
                      }
                      onKeyDown={(e) =>
                        handleKeyDownProductSelect(e, index, "productName")
                      }
                      ref={(el) =>
                        (productRefs.current[index] = {
                          ...productRefs.current[index],
                          productName: el,
                        })
                      }
                      className="w-full rounded-md border px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                      placeholder="Search Product"
                    />
                    {product.filteredProducts.length > 0 && (
                      <ul className="absolute rounded-md border bg-white shadow-md dark:bg-gray-800">
                        {product.filteredProducts.map((p: any, idx: number) => (
                          <li
                            key={idx}
                            onClick={() => handleProductSelect(p, index)}
                            className={`cursor-pointer p-2 ${
                              highlightedIndex === idx
                                ? "bg-gray-200 dark:bg-gray-600"
                                : ""
                            } hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600`}
                          >
                            {p.product_name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>

                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={product.rate}
                      onChange={(e) =>
                        updateProduct(index, "rate", Number(e.target.value))
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "rate")}
                      ref={(el) =>
                        (productRefs.current[index] = {
                          ...productRefs.current[index],
                          rate: el,
                        })
                      }
                      className="w-full rounded-md border px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                      placeholder="Rate"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProduct(index, "quantity", Number(e.target.value))
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "quantity")}
                      ref={(el) =>
                        (productRefs.current[index] = {
                          ...productRefs.current[index],
                          quantity: el,
                        })
                      }
                      className="w-full rounded-md border px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                      placeholder="Quantity"
                    />
                    {/* {stockAvailable && (
                      <p className="mt-1 text-center text-sm text-red-500">
                        {stockAvailable}
                      </p>
                    )} */}
                  </td>

                  <td className="px-4 py-2 text-center dark:text-white">
                    {amount}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={product.discount}
                      onChange={(e) =>
                        updateProduct(index, "discount", Number(e.target.value))
                      }
                      onKeyDown={(e) => handleKeyDown(e, index, "discount")}
                      ref={(el) =>
                        (productRefs.current[index] = {
                          ...productRefs.current[index],
                          discount: el,
                        })
                      }
                      className="w-full rounded-md border px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                      placeholder="Discount"
                    />
                  </td>
                  <td className="px-4 py-2 text-center dark:text-white">
                    {discountAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-center dark:text-white">
                    {netTotal.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="my-4">
          <button
            onClick={handleSubmit} // Save invoice functionality
            className="mt-6 rounded-md bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
          >
            Save Invoice
          </button>
        </div>

        <div className="text-right">
          <p>Total Amount: {totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateInvoice;
