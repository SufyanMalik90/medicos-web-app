import { useEffect, useState } from "react";
import OrderProductTableRow from "./OrderProductTableRow";

const OrderProductsTable = ({ products }: any) => {
  const [selectedProducts, setSelectedProducts] = useState<any>({});
  const [total, setTotal] = useState<any>(null);

  const handleQuantityChange = (productId: any, quantity: any) => {
    setSelectedProducts((prev: any) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity,
        amount: products.find((product: any) => product.product_name === productId)?.price * quantity,
      },
    }));
    setTotal(calculateTotal());
  };

  const handleCheckboxChange = (productId: any, isChecked: any) => {
    setSelectedProducts((prev: any) => {
      if (isChecked) {
        return {
          ...prev,
          [productId]: {
            quantity: 1,
            amount: products.find((product: any) => product.product_name === productId)?.price,
          },
        };
      } else {
        const newSelected = { ...prev };
        delete newSelected[productId];
        return newSelected;
      }
    });
  };

  useEffect(() => {
    console.log(selectedProducts);
  }, [selectedProducts]);

  const calculateTotal = () => {
    return Object.values(selectedProducts).reduce((total:any, product:any) => total + product.amount, 0);
  };

  const prepareOutputArray = () => {
    return Object.entries(selectedProducts).map(([productId, { quantity, amount }]: any) => ({
      product_id: productId,
      quantity,
      amount,
    }));
  };

  const handleSubmit = () => {
    const outputArray = prepareOutputArray();
    console.log(outputArray); // Send this to your API or handle it as needed
  };

  return (
    <div className="rounded-[10px] w-full h-auto">
      <div className="flex justify-between items-center">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Select Products</h4>
        <input type="text" className="w-56 h-12 py-3 rounded-lg bg-gray-50 px-3" placeholder="Search" />
      </div>

      <div className="grid grid-cols-9 mt-2 border-t border-stroke bg-[#5750f1] px-4 py-4.5 text-white dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center"></div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Title</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Quantity</p>
        </div>
      </div>

      {products.map((product: any) => (
        <OrderProductTableRow
          key={product.product_name}
          product={product}
          onQuantityChange={(quantity: any) => handleQuantityChange(product.product_name, quantity)}
          onCheckboxChange={(isChecked: any) => handleCheckboxChange(product.product_name, isChecked)}
        />
      ))}

      <div className="mt-4">
        <p className="font-bold">Total: ${total}</p>
        <button onClick={handleSubmit} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default OrderProductsTable;
