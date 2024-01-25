import type { Metadata } from "next";
import SideBar from "./_components/nav/side-bar";
import MobileBar from "./_components/nav/mobile-bar";
import MediumBar from "./_components/nav/medium-bar";

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Created by Vineeth G",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="hidden lg:block sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="hidden sm:block lg:hidden sticky top-0 h-screen">
        <MediumBar />
      </div>
      <div className="fixed w-full bottom-0 right-0 block sm:hidden z-[10000]">
        <MobileBar />
      </div>

      <div className="w-full py-4">{children}</div>
    </div>
  );
}
