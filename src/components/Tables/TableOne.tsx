import { BRAND } from "@/types/brand";
import Image from "next/image";

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
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Last Invoices
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Invoive #
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
          <div className=" px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          {/* <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div> */}
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-4">
              <div className="flex-shrink-0">
                {/* <Image src={brand.logo} alt="Brand" width={48} height={48} /> */}
              </div>
              <p className="font-medium text-dark dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {brand.visitors}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1">{brand.revenues}</p>
            </div>

            <div className="items-center justify-center px-2 py-4 sm:flex">
              <div
                className={`rounded-md px-4 w-18 flex justify-center ${
                  brand.status === "Paid" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <p className="font-medium text-dark dark:text-white">
                  {brand.status}
                </p>
              </div>
            </div>

            {/* <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {brand.conversion}%
              </p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
