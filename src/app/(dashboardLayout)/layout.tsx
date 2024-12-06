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
      <div className="lg:ml-[290px] pl-3">{children}</div>
    </section>
  );
};

export default DashboardLayout;
