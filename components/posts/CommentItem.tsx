import { format } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItem{
    data: Record<string,any>
}

const CommentItem:React.FC<CommentItem> = ({data}) => {
    const router = useRouter();

    const goToUser = useCallback((event:any)=>{
        event.stopPropagation();
        router.push(`/users/${data.user.id}`);
    },[router,data.user.id]);

    const createdAt = useMemo(()=>{
        if(!data?.createdAt)
        {
            return null;
        } 
        return format(new Date(data.createdAt),'d MMMM yyyy - K:m:s a')
    },[data?.createdAt]);

    return ( 
        <div 
        className="
          border-b-[1px] 
          border-neutral-800 
          p-5 
          cursor-pointer 
          hover:bg-neutral-900 
          transition
        ">
            <div className="flex flex-row items-start gap-3">
            <Avatar userId={data.user.id} />
            <div className="w-full">
                <div className="flex flex-row items-start justify-between">
                    <div>
                        <p 
                            onClick={goToUser} 
                            className="
                            text-white 
                            font-semibold 
                            cursor-pointer 
                            hover:underline
                        ">
                            {data.user.name}
                        </p>
                        <span 
                            onClick={goToUser} 
                            className="
                            text-neutral-500
                            cursor-pointer
                            hover:underline
                            hidden
                            md:block
                        ">
                            @{data.user.username}
                        </span>
                    </div>
                
                
                <span className="text-neutral-500 text-sm">
                    {createdAt}
                </span>
                </div>
                <div className="text-white mt-1">
                {data.body}
                </div>
            </div>
            </div>
        </div>
  
     );
}
 
export default CommentItem;