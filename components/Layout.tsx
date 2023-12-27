import React from "react";
import SideBar from "./layout/Sidebar";
import FollowBar from "./layout/FollowBar";
interface LayoutProps{
    children:React.ReactNode;

}

const Layout:React.FC<LayoutProps> = ({children}) => {
    return ( 
        <div className="h-screen bg-[#272727]">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <SideBar />
                    <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-700 
                    overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-[#585858] ">
                        {children}
                    </div>
                    <FollowBar />
                </div>

            </div>
        </div>
     );
}
 
export default Layout;