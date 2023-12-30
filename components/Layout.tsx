import React from "react";
import Navbar from "./layout/Navbar";
import FollowBar from "./layout/FollowBar";
interface LayoutProps{
    children:React.ReactNode;

}

const Layout:React.FC<LayoutProps> = ({children}) => {
    return ( 
        <div className="h-screen w-screen bg-[#272727]">
            <div className="container h-full w-full mx-auto">
                <Navbar />
                <div className="h-full w-full flex 
                md:pt-20">
                    <div className="h-full w-full overflow-y-auto 
                    md:w-[70%] pb-[80px]">
                        {children}
                    </div>
                    <FollowBar />
                </div>
            </div>
        </div>
     );
}
 
export default Layout;