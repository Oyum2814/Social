import Header from "@/components/Header";
import NotificationsFeed from "@/components/Notifications/NotificationsFeed";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context:NextPageContext){
    const {data:currentUser} = useCurrentUser();
    if(!currentUser)
    {
        return { 
            redirect:{
                destination:"/",
                permanent:false,
            }
        }
    }
    return {
        props:{
            currentUser
        }
    }
}
const notifications = () => {
    return ( 
        <>
            <Header showBackArrow label="Notifications" />
            <NotificationsFeed />
        </>
     );
}
 
export default notifications;