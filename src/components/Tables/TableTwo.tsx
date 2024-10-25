import Image from "next/image";
import { useState } from "react";
import ConfirmModalCustomer from "../ConfirmModal/ConfirmModalCustomer";

const TableTwo = ({ customers, setUpdate }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");


  const handleDeleteInvoice = (customerId: string) => {
    setIsModalOpen(true)
    setCustomerId(customerId)
    
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Customers
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke bg-[#5750f1] px-4 py-4.5 text-white dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Customer Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">City</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Complete Address</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
        
      </div>

      {customers.map((customer : any, key: any) => (
        <div
          className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
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
          <div className="col-span-2 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
            {customer.address.complete_address ? customer.address.complete_address : "-"}
            </p>
          </div>
          <ConfirmModalCustomer isOpen={isModalOpen} onClose={closeModal} customerId={customerId} setUpdate={setUpdate}/>

          <div className="col-span-2 flex items-center">
          <div className="flex items-center gap-4">
                    <button
                      className="hover:text-blue-700"
                      onClick={() =>
                        handleDeleteInvoice(customer._id)
                      }
                    >
                      <Image
                        alt="delete-icon"
                        src="/images/icon/trash.svg"
                        width={20}
                        height={20}
                        className="text-green-900"
                      />
                    </button>
                  </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
