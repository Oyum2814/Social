import Header from "@/components/Header";
import NotificationsFeed from "@/components/Notifications/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";



const notifications = () => {
    const {data:currentUser} = useCurrentUser();
    const loginModal = useLoginModal();
    
    if(!currentUser){
        return loginModal.onOpen();
    }
    return ( 
        <>
            <Header showBackArrow label="Notifications" />
            <NotificationsFeed />
        </>
     );
}
 
export default notifications;