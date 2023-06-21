import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/Sidebar";
import { SideBarProvider } from "../pages/ProviderPages/components/SidebarProvider";

export function DefaultLayout(props: any) {
 
  return (
    <>
      <main
        style={{
          display: "flex",
        }}
      >
        {props.provider ? <SideBarProvider /> : <SideBar />}
        <Outlet />
      </main>
    </>
  );
}

