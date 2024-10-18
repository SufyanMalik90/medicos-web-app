import { useEffect, useState } from "react";
import { api } from "../../axios.js";
import toast, { Toaster } from 'react-hot-toast';
import Spinners from "../Spinners/Spinners";

const OrderProductsTable = ({ products , setUpdate, setIsOpen}: any) => {
  const [selectedProducts, setSelectedProducts] = useState<any>({});
  const [partyName, setPartyName] = useState("");
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false); // Add loading state


  // Function to update the total based on selected products and quantities
  const updateTotal = () => {
    const newTotal = Object.values(selectedProducts).reduce(
      (acc: number, curr: any) => acc + (curr.price || 0) * (curr.quantity || 0),
      0
    );
    setTotal(newTotal);
  };

  // Handle product selection and quantity update
  const handleQuantityChange = (productId: string, quantity: string) => {
    const parsedQuantity = parseInt(quantity.replace(/^0+/, ""), 10) || 0;

    setSelectedProducts((prev: any) => {
      const updatedProducts = {
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity: parsedQuantity,
        },
      };
      return updatedProducts;
    });
  };

  // Handle checkbox change for product selection
  const handleProductSelection = (product: any, isChecked: boolean) => {
    setSelectedProducts((prev: any) => {
      if (!isChecked) {
        const { [product._id]: removedProduct, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [product._id]: {
            ...product,
            quantity: prev[product._id]?.quantity || 0,
            selected: true,
          },
        };
      }
    });
  };

  useEffect(() => {
    updateTotal();
  }, [selectedProducts]);

  async function hitApi() {
    setLoading(true); 

    try {
      // Gather selected products data
      const productsToSend = Object.values(selectedProducts)
        .filter((product: any) => product.quantity > 0) // Only include products with quantity > 0
        .map((product: any) => ({
          product_id: product._id,
          quantity: product.quantity,
          amount: product.price * product.quantity, // Calculate the amount based on price and quantity
        }));

      // Send the selected products data to the API
      const response = await api.post("/api/create-order", {
        party_name: partyName,
        products: productsToSend,
      });

      if (response?.data?.success) {
        toast.success('Order created successfully!');
        setUpdate((prev:any) => !prev);
        setIsOpen((prev:any) => !prev)

        // Handle success response
        console.log("Order created successfully:", response.data);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Something went Wrong!")
    }finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="h-auto w-full rounded-[10px]">
      <Toaster position="top-center" reverseOrder={false} />

       <input
            type="text"
            name="customer_name"
            value={partyName}
            onChange={(e)=> setPartyName(e.target.value)}
            className="h-14 w-[98%] mt-2 mx-2 mb-1 rounded-lg bg-gray-50 px-3 text-gray-700 dark:text-white dark:placeholder:text-gray-100 dark:bg-[rgb(18,32,49)]"
            placeholder="Party Name"
          />
      <div className="flex items-center justify-between">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Select Products
        </h4>
        <input
          type="text"
          className="mt-2 h-12 w-56 rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-3 dark:placeholder:text-gray-100"
          placeholder="Search"
        />
      </div>

      {/* Table Header */}
      <div className="mt-2 grid grid-cols-9 border-t border-stroke bg-[#5750f1] px-4 py-4.5 text-white dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center"></div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Title</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Quantity</p>
        </div>
      </div>

      {/* Table Rows */}
      {products.map((product: any) => (
        <div
          key={product._id}
          className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              className="w-3 h-3 accent-blue-600"
              onChange={(e) =>
                handleProductSelection(product, e.target.checked)
              }
              checked={!!selectedProducts[product._id]}
            />
          </div>
          <div className="col-span-3 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-white">
              {product.product_name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-white">
              {product.price}
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="py-2 px-3 bg-white border dark:bg-gray-800 border-gray-200 rounded-lg">
              <div className="w-full flex justify-between items-center gap-x-5">
                <div className="grow">
                  <span className="block text-xs text-gray-500 dark:text-white">
                    Select quantity
                  </span>
                  <input
                    className="w-full outline-none p-0 bg-transparent border-0 text-gray-800 dark:text-white focus:ring-0"
                    type="number"
                    value={selectedProducts[product._id]?.quantity || 0}
                    onChange={(e) =>
                      handleQuantityChange(product._id, e.target.value)
                    }
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="flex justify-end mx-4 mb-2">
        <p className="font-bold text-black dark:text-white">Order total: {total}</p>
      </div>
      <button
        onClick={hitApi} // Call hitApi on button click
        className="text-md flex h-14 w-full items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white outline-none"
      >
        {loading ? <Spinners /> : "Create New Order"}
      </button>
    </div>
  );
};

export default OrderProductsTable;
