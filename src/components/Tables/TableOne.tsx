"use client";
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../../axios.js";
import { useRouter } from "next/navigation";
const brandData: BRAND[] = [
  {
    logo: "",
    name: "101",
    visitors: "Ahmed",
    revenues: "5,768",
    status: "Paid",
    conversion: 4.8,
  },
  {
    logo: "",
    name: "102",
    visitors: "Taj",
    revenues: "4,635",
    status: "Paid",
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "103",
    visitors: "Rehmani",
    revenues: "4,290",
    status: "Return",
    conversion: 3.7,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "104",
    visitors: "Care",
    revenues: "3,580",
    status: "Paid",
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "105",
    visitors: "Abbasi",
    revenues: "2,740",
    status: "Return",
    conversion: 1.9,
  },
];

const TableOne = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term state

  const router = useRouter();

  useEffect(() => {
    // Function to fetch invoices
    const fetchLastInvoices = async () => {
      try {
        const response = await api.get("/api/get-all-invoices");
        console.log("API Response Invoices:", response.data);

        if (response.data.success && Array.isArray(response.data.invoice)) {
          const sortedProducts = response.data.invoice.sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setInvoices(sortedProducts);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchLastInvoices();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (invoice_no: string) => {
    console.log("invoices >>", invoice_no);
    router.push(`/invoices/${invoice_no}`);
  };

  const filteredInvoices = invoices.filter((invoice: any) =>
    invoice.customer_id.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-3 flex items-start justify-between">
        <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
          Last Invoices
        </h4>
        <div className="relative">
          <input
            type="text"
            placeholder="Search customer..."
            className="rounded-lg dark:bg-gray-700 bg-white py-2 pl-10 pr-4 dark:text-white text-black border-2 dark:border-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
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
            className="lucide lucide-search absolute left-3 top-2.5 text-gray-400"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Invoice #
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Customer
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Amount
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>

        {filteredInvoices.map((invoice: any, key: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === invoices.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              <p className="font-medium text-dark dark:text-white sm:block">
                {invoice.invoice_number}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {invoice.customer_id.customer_name}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1"> {invoice.total}</p>
            </div>

            <div className="items-center justify-center px-2 py-4 sm:flex">
              <div
                className={`flex w-18 justify-center rounded-md px-4 ${
                  invoice.status === "Paid" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <p className="font-medium text-dark dark:text-white">
                  {invoice.status}
                </p>
              </div>
            </div>

            <div className="col-span-1 flex items-center">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="hover:text-blue-700"
                  onClick={() => handleViewDetails(invoice.invoice_number)}
                >
                  <Image
                    alt="view-icon"
                    src="/images/icon/view.svg"
                    width={20}
                    height={20}
                    className="text-green-900"
                  />
                </button>
                <button className="hover:text-blue-700">
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
    </div>
  );
};



export default TableOne;
