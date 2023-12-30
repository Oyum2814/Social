import { BsHouseFill,BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi'

import SidebarLogo from './SidebarLogo'
import SidebarItem from './NavbarItem';
import SidebarLoginButton from './SidebarLoginButton';

import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const {data: currentUser} = useCurrentUser();
    const items=[
        {
            label:'Home',
            href:'/',
            icon:BsHouseFill
        },
        {
            label:'Notifications',
            href:'/notifications',
            icon: BsBellFill,
            auth:true,
            alert:currentUser?.hasNotification,
        },
        {
            label:'Profile',
            href:`/users/${currentUser?.id}`,
            icon:FaUser,
            auth:true
        }
    ];

    return ( 
        <div className="absolute bottom-0 w-screen z-40 max-h-20 left-0
        md:top-0">
            <div className="">
                <div className="flex items-center justify-around bg-[rgb(39,39,39)] border-t-[1px] border-neutral-500
                md:justify-end ">
                    {/* <SidebarLogo /> */}
                    {items.map((item)=>(
                        <SidebarItem key={item.href} href={item.href} label={item.label} 
                        icon={item.icon} auth={item.auth} alert={item.alert}/>
                    ))}
                    {currentUser &&(
                        <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout"/>
                    )}
                   {!currentUser &&(
                     <SidebarLoginButton />
                   )}
                </div>
            </div>
            
        </div>
     );
}
 
export default Sidebar;