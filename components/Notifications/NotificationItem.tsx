import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface NotificationItemProps{
    data: Record<string,any>
}

const NotificationItem:React.FC<NotificationItemProps> = ({data}) => {
    const createdAt = useMemo(()=>{
        if(!data?.createdAt)
        {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt]);

    return ( 
        <div 
        className="flex flex-row items-center p-6 gap-4 border border-b-[1px] border-neutral-800">
            <p className="text-white">
                {data.body}
                <span className="text-neutral-500">
                  {" "}  {createdAt}
                </span>
            </p>
            
        </div>
     );
}
 
export default NotificationItem;