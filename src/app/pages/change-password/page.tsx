import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SettingBoxes from "@/components/SettingBoxes";
import ChangePasswordBoxes from "@/components/ChangePasswordBoxes";

export const metadata: Metadata = {
  title: "Medicos Change Password Page | Medicos",
  description: "This is Medicos Change Password Settings page",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Change Password" />
        <ChangePasswordBoxes />
        {/* <SettingBoxes /> */}
      </div>
    </DefaultLayout>
  );
};

export default Settings;
