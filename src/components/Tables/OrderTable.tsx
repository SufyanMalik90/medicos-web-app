import Image from "next/image";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import {api} from '@/axios'
import { useRouter } from "next/navigation";
import ConfirmModalOrder from '../ConfirmModal/ConfirmModalOrder'


const OrderTable = ({ orders, setUpdate }: any) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");

  const handleDeleteOrder = (order_id: string) => {
    setIsModalOpen(true)
    setInvoiceNo(order_id)
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleViewDetails = (order_id: string) => {
    console.log("order_id >>", order_id);
    router.push(`/orders/${order_id}`);
    
  }
 
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Orders History
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke bg-[#5750f1] px-4 py-4.5 text-white dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Date</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Party Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Amount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
      </div>

      {orders.map((order: any, key: any) => (
        <div
          className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {new Date(order.createdAt).toISOString().slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {order.party_name}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {order.total_amount}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p
              className={`text-body-sm font-medium ${
                order.orderStatus === "Received"
                  ? "text-green-600"
                  : order.orderStatus === "Pending"
                    ? "text-yellow-600"
                    : order.orderStatus === "Cancelled"
                      ? "text-red-600"
                      : "text-gray-600"
              }`}
            >
              {order.orderStatus}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
          <ConfirmModalOrder isOpen={isModalOpen} onClose={closeModal} orderId={invoiceNo} setUpdate={setUpdate}/>

            <div className="flex gap-4 items-center">
            <button
            type="button"
              className=" hover:text-blue-700"
              onClick={() => handleViewDetails(order._id)} // Define your view details logic
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
              className=" hover:text-blue-700"
              onClick={() => handleDeleteOrder(order._id)}
            >
            <Image
              alt="view-icon"
              src="/images/icon/trash.svg"
              width={20}
              height={20}
              className="text-green-900"
            />
            </button>
            </div>
          </div>
          {/* <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-green">
              ${product.profit}
            </p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default OrderTable;
