import useLoginModal from '@/hooks/useLoginModal';
import {useRouter} from 'next/router';
import { useCallback } from 'react';
import { FaFeather } from 'react-icons/fa';

const SidebarTweetButton = () => {
    const router=useRouter();
    const loginModal = useLoginModal();
    const onClick = useCallback(()=>{
        loginModal.onOpen();
    },[loginModal]);
    return ( 
        <div onClick={onClick}>
            <div className="lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
            </div>
            <div className="hidden lg:block px-4 py-2 rounded-full bg-white hover:bg-opacity-90 cursor-pointer transition">
                <p className="hidden lg:block text-center font-semibold text-black text-[20px] ">
                    Login
                </p>
            </div>
        </div>
     );
}
 
export default SidebarTweetButton;