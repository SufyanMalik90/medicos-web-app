"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import { api } from "../../axios.js";
import toast, { Toaster } from 'react-hot-toast';
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { use, useEffect, useRef, useState } from "react";
import Image from "next/image.js";
import Spinners from "@/components/Spinners/Spinners";
import Pagination from "@/components/Pagination/pagination";
import PurchaserTable from "@/components/Tables/PurchaserTable";

const TablesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [purchasers, setCustomers] = useState([]);
  const modalRef = useRef<any>();
  const [update, setUpdate] = useState<any>(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const addressRef = useRef(null);
  const completeAddressRef = useRef(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);




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
    // Function to fetch purchasers
    const fetchCustomers = async (page: number) => {
      try {
        const response = await api.get(`/api/get-purchaser`);
        console.log("API Response:", response.data); // Log the response to inspect it

        // Check if the response was successful and if the purchasers array is present
        if (response.data.success && Array.isArray(response.data.purchaser)) {
          
          setCustomers(response.data.purchaser);
          setTotalPages(response.data.totalPages || 1);
          setCurrentPage(response.data.currentPage || 1);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching purchasers:", error);
      }
    };

    fetchCustomers(currentPage);
  }, [update, currentPage]);

  // State to hold form inputs
  const [formData, setFormData] = useState({
    purchaser_name: "",
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
  const handleKeyDown = (e:any, nextRef:any) => {
    if (e.key === "Enter" && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  // Function to send POST request
  async function createPurchaser() {
    setLoading(true); 
    try {
      const response = await api.post("/api/create-purchaser", {
        purchaser_name: formData.purchaser_name,
      });
      if (response?.data?.success) {
        setUpdate((prev: any) => !prev);
        toast.success('New purchaser Created!!')
        setIsOpen(false);
        
      }
    } catch (error) {
      console.error("Error creating purchaser:", error);
      toast.error("Failed to create purchaser.")
      setIsOpen(false);
      
    }finally {
      setLoading(false); // End loading
    }
  }
  // Function to handle page change
const handlePageChange = (newPage: number) => {
  console.log("newPage>>", newPage);
  
  setCurrentPage(newPage);
};

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Purchaser" />
      <Toaster position="top-center" reverseOrder={false} />
      <div
        onClick={toggleModal}
        className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center transition-all duration-500 ${
          isOpen ? "scale-1" : "scale-0"
        }`}
      >
        <div
          ref={modalRef}
          className="flex h-auto w-full max-w-lg flex-col items-start justify-start gap-4 rounded-3xl bg-white p-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:bg-[rgb(2,13,26)] lg:w-[40rem]"
        >
          <span className="text-2xl font-bold text-[#5750f1] dark:text-white">
            Create Purchaser
          </span>
          <input
            type="text"
            name="purchaser_name"
            value={formData.purchaser_name}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && createPurchaser()}
            className="h-14 w-full rounded-lg bg-gray-50 px-3 text-gray-700 dark:bg-[rgb(18,32,49)] dark:text-[#fdfdfd]"
            placeholder="Purchaser name"
          />

          <button
            onClick={createPurchaser}
            className="text-md flex h-14 w-full items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white outline-none"
          >
            {loading ? <Spinners /> : "Create Purchaser"}
          </button>
        </div>
      </div>

      <div className="mb-3 flex h-12 w-full items-center justify-end ">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-12 w-40 items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white"
        >
          Create Purchaser
        </button>
      </div>

      <div className="flex flex-col gap-10">
        {/* Conditional rendering for image or table */}
        {purchasers.length === 0 ? (
          <div className="flex w-full flex-col items-start justify-start py-4 lg:px-2">
            <div className="relative h-auto w-full overflow-x-auto ">
              <span className="flex h-auto w-full flex-col items-center justify-center py-4 text-3xl font-bold">
                <Image
                  src="/images/nothing.png"
                  alt="No purchasers found"
                  width={400}
                  height={300}
                  className="w-full md:w-1/2 lg:w-1/4"
                />
                Nothing here
              </span>
            </div>
          </div>
        ) : (
          <>
          <PurchaserTable purchasers={purchasers} />
          <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      </>
        )}
      </div>

      
    </DefaultLayout>
  );
};

export default TablesPage;
