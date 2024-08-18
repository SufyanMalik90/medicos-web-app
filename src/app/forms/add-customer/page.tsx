import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddCustomer from "@/components/FormElements/addCustomer";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      {/* <FormElements /> */}
      <AddCustomer />
    </DefaultLayout>
  );
};

export default FormElementsPage;
