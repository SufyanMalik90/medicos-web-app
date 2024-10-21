import React, { useEffect, useRef, useState } from 'react'
import Spinners from '../Spinners/Spinners'
import toast, { Toaster } from 'react-hot-toast';
import { api } from "../../axios.js";

const AddRecoveryModal = ({ledger, toggleModal, modalRef, isOpen, setIsOpen, setUpdate}) => {


    const [name, setName] = useState("")
    const [purchasingPrice, setPurchasingPrice] = useState("")
    const [price, setPrice] = useState("")
    const purchasingPriceRef = useRef(null);
    const priceRef = useRef(null);
    const stockRef = useRef(null);
  const [loading, setLoading] = useState(false); // Add loading state


    useEffect(()=>{
        setName(ledger?.customer_name)
        setPurchasingPrice(ledger?.total_balance)
        // setPrice(product?.price)
    },[])

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter" && nextRef && nextRef.current) {
          nextRef.current.focus();
        }
      };
      async function handleUpdateProduct() {
        setLoading(true); 
        
        try {
          const response = await api.post("/api/update-product", {
            product_id: product._id,
            product_name: name,
            purchasing_price: purchasingPrice,
            price: price,
          });
      
          if (response?.data?.success) {
            setUpdate((prev) => !prev);
            setIsOpen(false)
            // setShowSuccessAlert(true);
            toast.success('Product Updated!')
            // setErrorMessage("");
            // setTimeout(() => {
            //   setShowSuccessAlert(false);
            // }, 3000);
          } else {
            console.log("response?.data?.message",response?.data?.message);
            
            // setErrorMessage(response?.data?.message || "Failed to create product.");
            toast.error("Failed to update product.")
            // setIsOpen(false);
            // setTimeout(() => {
            //   setErrorMessage("");
            // }, 3000);
          }
        } catch (error) {
          console.error("Error creating product:", error);
          toast.error("Failed to create product.")
          // setErrorMessage(`Failed to create product.`);
        //   setIsOpen(false);
          // setTimeout(() => {
          //   setErrorMessage("");
          // }, 3000);
        }finally {
          setLoading(false); // End loading
        }
      }
  return (
    <div
    onClick={toggleModal}
    className={`fixed left-0 top-0 h-screen w-screen transition-all duration-500 ${isOpen ? "scale-1" : "scale-0"} flex items-center justify-center `}
  >
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div
      ref={modalRef}
      className="flex h-auto w-full flex-col items-start justify-start gap-4 rounded-3xl  bg-white p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-[rgb(2,13,26)] lg:w-[40rem]"
    >
      <span className="text-2xl font-bold text-[#5750f1] dark:text-white">
        Add Recovery Payment
      </span>
      <input
        type="text"
        name="product_name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, purchasingPriceRef)}
        className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
        placeholder="Party name"
      />
      <input
        type="number"
        name="purchasing_price"
        value={purchasingPrice}
        ref={purchasingPriceRef}
        onChange={(e)=>setPurchasingPrice(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, priceRef)}
        className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
        placeholder="Due Amount"
      />
      <input
        type="number"
        name="price"
        value={price}
        ref={priceRef}
        onChange={(e)=>setPrice(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, stockRef)}
        className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
        placeholder="Recovery payment"
      />

      <button
        onClick={handleUpdateProduct}
        className="text-md flex h-14 w-full items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white outline-none"
      >
         {loading ? (
            <Spinners />
          ) : (
            "Update Product"
          )}
      </button>
    </div>
  
  </div>
  )
}

export default AddRecoveryModal