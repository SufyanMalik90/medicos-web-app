import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Invoices" />
      <Link href= "/invoices/create-invoice">
      <div className="mb-3 flex h-12 w-full items-center justify-end ">
        <button
          className="flex h-12 w-44 items-center justify-center rounded-lg bg-[#5750f1] font-medium text-white"
        >
          Create New Invoice
        </button>
      </div>
      </Link>
      <div className="flex flex-col gap-10">
        <TableOne />
        {/* <TableTwo /> */}
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
