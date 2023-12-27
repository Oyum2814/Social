import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect} from "react";
import NotificationItem from "./NotificationItem";

const NotificationsFeed = () => {
    const {data:currentUser,mutate: mutateCurrentUser}  = useCurrentUser();
    const {data:fetchedNotifications=[]} = useNotifications(currentUser?.id);

    useEffect(()=>{
        mutateCurrentUser();
    },[mutateCurrentUser]);
    if(fetchedNotifications.length === 0){
        return (
            <div
            className="text-neutral-600 text-center p-6 text-xl">
                No Notifications
            </div>
        )
    }
    return ( 
        <div className="flex flex-col">
            {fetchedNotifications.map((notification:Record<string,any>)=>(
                <NotificationItem key={notification.id} data={notification}/>
            ))}
        </div>
     );
}
 
export default NotificationsFeed;