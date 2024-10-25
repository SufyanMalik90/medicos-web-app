import Image from "next/image";
import { useState } from "react";
import ConfirmModalPurchaser from "../ConfirmModal/ConfirmModalPurchaser";

const PurchaserTable = ({ purchasers, setUpdate }: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaserId, setPurchaserId] = useState("");

  const handleDeleteInvoice = (purchaserId: string) => {
    setIsModalOpen(true);
    setPurchaserId(purchaserId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Purchaser
        </h4>
      </div>

      <div className="grid grid-cols-2 border-t border-stroke bg-[#5750f1] px-4 py-4.5 text-white dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center sm:col-span-3">
          <p className="font-medium">Purchaser Name</p>
        </div>
        <div className="col-span-2 flex items-center sm:col-span-3">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {purchasers.map((purchaser: any, key: any) => (
        <div
          className="grid grid-cols-2 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center sm:col-span-3">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {purchaser.purchaser_name}
            </p>
          </div>
          <ConfirmModalPurchaser isOpen={isModalOpen} onClose={closeModal} purchaserId={purchaserId} setUpdate={setUpdate}/>

          <div className="col-span-2 ml-4 flex items-center sm:col-span-3">
            <div className="flex items-center">
              <button
                className="hover:text-blue-700 focus:outline-none"
                onClick={() => handleDeleteInvoice(purchaser._id)}
              >
                <Image
                  alt="delete-icon"
                  src="/images/icon/trash.svg"
                  width={20}
                  height={20}
                  className="text-red-700"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaserTable;
