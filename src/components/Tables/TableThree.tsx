import { Package } from "@/types/package";
import Image from "next/image";
import { useRef, useState } from "react";
import NewModal from "./Modal.jsx"
import ConfirmModalProduct from '../ConfirmModal/ConfirmModalProduct.jsx'

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

const TableThree = ({products, setUpdate}: any) => {
  const modalRef = useRef<any>();
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState("");


  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    purchasing_price: "",
    stock: "",
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Convert the value to a number if the input name is 'price' or 'stock'
    const numericValue = name === "price" || name === "stock" || name === "purchasing_price" ? Number(value) : value;
  console.log("numericValue",numericValue);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: numericValue,
    }));
  };

  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const toggleModal = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
      setSelectedProduct(null)
    }
  };
  const handleViewDetails = (product: any) => {
    setIsOpen(true);
    setSelectedProduct(product)
    console.log("ProductUpdateData======== >>", product);
    
    
  };
  const handleDeleteInvoice = (productId: string) => {
    
    setIsModalOpen(true)
    setProductId(productId)
    
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Products
        </h4>
      </div>

    {
      isOpen && <NewModal product={selectedProduct} toggleModal={toggleModal} modalRef={modalRef}  isOpen={isOpen} setIsOpen={setIsOpen} setUpdate={setUpdate}/>
    }
      
      <div className="grid grid-cols-6 border-t border-stroke bg-[#5750f1] px-4 py-4.5 text-white dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Title</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Qty</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
        {/* <div className="col-span-1 flex items-center">
        <p className="font-medium">Qty</p>
      </div> */}
        {/* <div className="col-span-1 flex items-center">
        <p className="font-medium">Profit</p>
      </div> */}
      </div>

      {products.map((product: any, key: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* <div className="h-12.5 w-15 rounded-md">
              <Image
                src={product.image}
                width={60}
                height={50}
                alt="Product"
              />
            </div> */}
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.product_name}
              </p>
            </div>
          </div>
          
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.stock}
            </p>
          </div>
          <ConfirmModalProduct isOpen={isModalOpen} onClose={closeModal} productId={productId} setUpdate={setUpdate}/>

          <div className="col-span-1 flex items-center">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="hover:text-blue-700"
                      onClick={() => handleViewDetails(product)}
                    >
                      <Image
                        alt="edit-icon"
                        src="/images/icon/edit.svg"
                        width={20}
                        height={20}
                        className="text-green-900"
                      />
                    </button>
                    <button
                      className="hover:text-blue-700"
                      onClick={() =>
                        handleDeleteInvoice(product._id)
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
          {/* <div className="col-span-1 flex items-center">
          <p className="text-body-sm font-medium text-dark dark:text-dark-6">
            {product.sold}
          </p>
        </div> */}
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

export default TableThree;
