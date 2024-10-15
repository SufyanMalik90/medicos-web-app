import React, { useEffect, useRef, useState } from 'react'
import Spinners from '../Spinners/Spinners'
import toast, { Toaster } from 'react-hot-toast';
import { api } from "../../axios.js";

const NewModal = ({product, toggleModal, modalRef, isOpen}) => {


    const [name, setName] = useState("")
    const [purchasingPrice, setPurchasingPrice] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const purchasingPriceRef = useRef(null);
    const priceRef = useRef(null);
    const stockRef = useRef(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [update, setUpdate] = useState(false);


    useEffect(()=>{
        setName(product?.product_name)
        setPurchasingPrice(product?.purchasing_price)
        setPrice(product?.price)
        setStock(product?.stock)
    },[])

    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter" && nextRef && nextRef.current) {
          nextRef.current.focus();
        }
      };
      async function handleUpdateProduct() {
        setLoading(true); 
        
        // try {
        //   const response = await api.post("/api/update-product", {
        //     // product_name: formData.product_name,
        //     // price: formData.price,
        //     // purchasing_price: formData.purchasing_price,
        //     // stock: formData.stock,
        //   });
      
        //   if (response?.data?.success) {
        //     setUpdate((prev) => !prev);
        //     // setShowSuccessAlert(true);
        //     toast.success('New Product Created!!')
        //     // setErrorMessage("");
        //     // setTimeout(() => {
        //     //   setShowSuccessAlert(false);
        //     // }, 3000);
        //   } else {
        //     console.log("response?.data?.message",response?.data?.message);
            
        //     // setErrorMessage(response?.data?.message || "Failed to create product.");
        //     toast.error("Failed to create product.")
        //     // setIsOpen(false);
        //     // setTimeout(() => {
        //     //   setErrorMessage("");
        //     // }, 3000);
        //   }
        // } catch (error) {
        //   console.error("Error creating product:", error);
        //   toast.error("Failed to create product.")
        //   // setErrorMessage(`Failed to create product.`);
        // //   setIsOpen(false);
        //   // setTimeout(() => {
        //   //   setErrorMessage("");
        //   // }, 3000);
        // }finally {
        //   setLoading(false); // End loading
        // }
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
        Update Product
      </span>
      <input
        type="text"
        name="product_name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, purchasingPriceRef)}
        className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
        placeholder="Title"
      />
      <input
        type="number"
        name="purchasing_price"
        value={purchasingPrice}
        ref={purchasingPriceRef}
        onChange={(e)=>setPurchasingPrice(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, priceRef)}
        className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
        placeholder="Purchasing price"
      />
      <input
        type="number"
        name="price"
        value={price}
        ref={priceRef}
        onChange={(e)=>setPrice(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, stockRef)}
        className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
        placeholder="Selling price"
      />
      <input
        type="number"
        name="stock"
        value={stock}
        ref={stockRef}
        onChange={(e)=>setStock(e.target.value)}
        // onKeyDown={(e) => e.key === "Enter" && handleUpdateProduct()}
        className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
        placeholder="Quantity"
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

export default NewModal