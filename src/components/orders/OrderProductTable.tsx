import { useEffect, useState } from "react";
import { api } from "../../axios.js";
import toast, { Toaster } from 'react-hot-toast';
import Spinners from "../Spinners/Spinners";

const OrderProductsTable = ({ products , purchaser, setUpdate, setIsOpen}: any) => {
  const [selectedProducts, setSelectedProducts] = useState<any>({});
  const [partyName, setPartyName] = useState("");
  const [purchaserId, setPurchaserId] = useState<string | null>(null); // Store selected purchaser's ID
  const [filteredPurchasers, setFilteredPurchasers] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [highlightedPurchaserIndex, setHighlightedPurchaserIndex] = useState<number>(-1);



  // Function to update the total based on selected products and quantities
  const updateTotal = () => {
    const newTotal = Object.values(selectedProducts).reduce(
      (acc: number, curr: any) => acc + (curr.price || 0) * (curr.quantity || 0),
      0
    );
    setTotal(newTotal);
  };
// Filter purchasers based on partyName input
useEffect(() => {
  if (partyName && !purchaserId) { // Check if purchaserId is not set
    const filtered = purchaser.filter((p: any) =>
      p.purchaser_name.toLowerCase().includes(partyName.toLowerCase())
    );
    setFilteredPurchasers(filtered);
    setShowDropdown(true);
  } else {
    setFilteredPurchasers([]);
    setShowDropdown(false);
  }
}, [partyName, purchaser, purchaserId]);

const handlePurchaserSelect = (purchaserName: string, purchaser_id: string) => {
  setPartyName(purchaserName); // Set the selected purchaser name
  setPurchaserId(purchaser_id); // Set the purchaser ID
  setShowDropdown(false); // Hide dropdown after selection
  setHighlightedPurchaserIndex(-1); // Reset highlighted index
};

// Function to filter purchasers based on input
const handlePurchaserSearch = (searchTerm: string) => {
  const filtered = purchaser.filter((p: any) =>
    p.purchaser_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredPurchasers(filtered); // Update the state with filtered purchasers
  setShowDropdown(filtered.length > 0); // Show dropdown only if there are results
};

// You can implement keyboard navigation (e.g., arrow keys, enter key) similarly as in your customer implementation.
const handlePurchaserKeyDown = (e: React.KeyboardEvent) => {
  if (!showDropdown || filteredPurchasers.length === 0) {
    return; // Do nothing if dropdown is not shown or no purchasers are available
  }

  if (e.key === "ArrowDown") {
    // Move down the list
    e.preventDefault();
    setHighlightedPurchaserIndex((prevIndex) =>
      prevIndex < filteredPurchasers.length - 1 ? prevIndex + 1 : 0
    );
  } else if (e.key === "ArrowUp") {
    // Move up the list
    e.preventDefault();
    setHighlightedPurchaserIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : filteredPurchasers.length - 1
    );
  } else if (e.key === "Enter") {
    // Select the highlighted purchaser
    if (highlightedPurchaserIndex >= 0 && highlightedPurchaserIndex < filteredPurchasers.length) {
      const selectedPurchaser = filteredPurchasers[highlightedPurchaserIndex];
      handlePurchaserSelect(selectedPurchaser.purchaser_name, selectedPurchaser._id);
    }
  } else if (e.key === "Escape") {
    setShowDropdown(false); // Hide dropdown after selection
    setHighlightedPurchaserIndex(-1);
  }

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
        purchaser_id: purchaserId,
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

      <div className="relative">
        <input
          type="text"
          value={partyName}
          onChange={(e) => {
            setPartyName(e.target.value);
            setPurchaserId(null);
            handlePurchaserSearch(e.target.value); // Call to handle searching
          }}
          onKeyDown={handlePurchaserKeyDown} // Optional: handle keyboard events for navigation
          className="mx-2 mb-1 mt-2 h-14 w-[98%] rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-white dark:placeholder:text-gray-100"
          placeholder="Select party name..."
          onBlur={() => setShowDropdown(false)} // Hide dropdown on blur
          onFocus={() => partyName && setShowDropdown(true)} // Show dropdown when input focused
        />

        {showDropdown && (
          <ul className="absolute z-10 mx-2 mt-1 w-[98%] rounded-lg bg-white shadow-lg dark:bg-[rgb(18,32,49)]">
            {filteredPurchasers.map((p: any, idx: number) => (
              <li
                key={p._id}
                className={`cursor-pointer px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 ${
                  highlightedPurchaserIndex === idx
                    ? "bg-gray-100 dark:bg-gray-600"
                    : ""
                }`}
                onMouseDown={() =>
                  handlePurchaserSelect(p.purchaser_name, p._id)
                }
              >
                {p.purchaser_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Select Products
        </h4>
        <input
          type="text"
          className="mt-2 h-12 w-56 rounded-lg bg-gray-50 px-3 py-3 dark:bg-gray-800 dark:placeholder:text-gray-100"
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
              className="h-3 w-3 accent-blue-600"
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
            <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 dark:bg-gray-800">
              <div className="flex w-full items-center justify-between gap-x-5">
                <div className="grow">
                  <span className="block text-xs text-gray-500 dark:text-white">
                    Select quantity
                  </span>
                  <input
                    className="w-full border-0 bg-transparent p-0 text-gray-800 outline-none focus:ring-0 dark:text-white"
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
      <div className="mx-4 mb-2 flex justify-end">
        <p className="font-bold text-black dark:text-white">
          Order total: {total}
        </p>
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
