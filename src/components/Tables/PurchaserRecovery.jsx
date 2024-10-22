import Image from 'next/image';
import React, { useRef, useState } from 'react'
import AddRecoveryModal from "./AddRecoveryModal"
import { useRouter } from 'next/navigation';


const PurchaserRecovery = ({ledgers, setUpdate}) => {
  const [selectedLeadger, setselectedLeadger] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();
  const router = useRouter();


      
      const handleViewDetails = (customer_id) => {
        console.log("View customer:", customer_id);
        router.push(`/recovery/${customer_id}`);

      };
      
      const handleEdit = (ledger) => {
        console.log("Edit customer:", ledger);
            setIsOpen(true);
            setselectedLeadger(ledger)
      };
      const toggleModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          setIsOpen(false);
          setselectedLeadger(null)
        }
      };
      
  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Purchaser Accounts
        </h4>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search customer..."
            className="w-full rounded-md border bg-white py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-2.5 text-gray-500"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
      </div>
      {
      isOpen && <AddRecoveryModal ledger={selectedLeadger} toggleModal={toggleModal} modalRef={modalRef}  isOpen={isOpen} setIsOpen={setIsOpen} setUpdate={setUpdate}/>
    }
      <div className="hidden grid-cols-4 gap-4 text-center font-medium uppercase text-gray-600 dark:text-gray-300 sm:grid sm:grid-cols-6">
        <div>#</div>
        <div>Purchaser Name</div>
        <div>Due Amount</div>
        <div className="col-span-2 sm:col-span-1">Actions</div>
      </div>

      <div className="mt-4 space-y-4">
        {ledgers.length > 0 ? (
          ledgers.map((ledger, index) => (
            <div
              key={ledger.purchaser_id}
              className={`grid grid-cols-2 gap-4 p-2 text-center shadow-sm  sm:grid-cols-6 ${index !== ledgers.length - 1 ? "border-b border-stroke dark:border-dark-3" : ""}`}
            >
              <div className="font-medium sm:hidden">#</div>
              <div className="py-2 text-center font-medium text-dark dark:text-white">
                {index + 1}
              </div>
              <div className="font-medium sm:hidden">Purchaser Name</div>
              <div className="py-2 font-medium text-dark dark:text-white">
                {ledger.purchaser_name}
              </div>
              <div className="font-medium sm:hidden">Due Amount</div>
              <div className="py-2 font-medium text-dark dark:text-white">
                {ledger.total_balance}
              </div>
              <div className="col-span-2 mt-2 flex justify-center gap-5 sm:col-span-1 sm:mt-0">
                <button
                  type="button"
                  className="hover:text-blue-700"
                  onClick={() => handleViewDetails(ledger.purchaser_id)}
                >
                  <Image
                    alt="view-icon"
                    src="/images/icon/view.svg"
                    width={20}
                    height={20}
                    className="text-green-900"
                  />
                </button>
                <button
                  className="hover:text-blue-700"
                  onClick={() => handleEdit(ledger)}
                >
                  <Image
                    alt="delete-icon"
                    src="/images/icon/edit.svg"
                    width={20}
                    height={20}
                    className="text-green-900"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
            <div className="flex w-full flex-col items-center justify-center py-4">
            <span className="text-3xl font-bold">Nothing here</span>
            <Image
              src="/images/nothing.png"
              alt="No products found"
              width={400}
              height={300}
              className="w-full md:w-1/2 lg:w-1/4"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaserRecovery