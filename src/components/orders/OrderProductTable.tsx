import { Package } from "@/types/package";
import OrderProductTableRow from "./OrderProductTableRow";

const packageData: Package[] = [
  {
    name: "Product 1",
    price: 500,
    invoiceDate: `Jan 13,2023`,
    status: "Active",
  },
  {
    name: "Product 2",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "InActive",
  },
  {
    name: "Product 3",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "InActive",
  },
  {
    name: "Product 4",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Active",
  },
];

const OrderProductsTable = ({products}: any) => {
  return (
    <div className="rounded-[10px] w-full h-auto ">
      <div className=" flex justify-between items-center ">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Select Products
        </h4>

        <input type="text" className="w-56 h-12 py-3 rounded-lg bg-gray-50 px-3" placeholder="Search"/>
      </div>

      <div className="grid grid-cols-9 mt-2 border-t border-stroke bg-[#5750f1] px-4 py-4.5 text-white dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
      <div className="col-span-1 flex items-center">
</div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Title</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Quantity</p>
        </div>
        {/* <div className="col-span-1 flex items-center">
        <p className="font-medium">Qty</p>
      </div> */}
        {/* <div className="col-span-1 flex items-center">
        <p className="font-medium">Profit</p>
      </div> */}
      </div>

      {products.map((product: any, key: any) => (
        <OrderProductTableRow key={key} product={product}  />
      ))}
    </div>
  );
};

export default OrderProductsTable;
