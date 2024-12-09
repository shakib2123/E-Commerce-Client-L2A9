import Sidebar from "@/components/dashboard/Sidebar";
import SidebarMobile from "@/components/dashboard/SidebarMobile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClickMart",
  description: "Welcome to ClickMart Online Store",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <SidebarMobile />
      <Sidebar />
      <div className="lg:ml-[290px] px-3 lg:px-5">{children}</div>
    </section>
  );
};

export default DashboardLayout;
