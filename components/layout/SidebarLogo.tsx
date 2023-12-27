import { BsTwitter } from "react-icons/bs";
import { useRouter } from 'next/router';

const SidebarLogo = () => {
    const router = useRouter();
    return (
        <div onClick={()=>{router.push('/')}}
        className="h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition ">

        </div>
    );
}
 
export default SidebarLogo;