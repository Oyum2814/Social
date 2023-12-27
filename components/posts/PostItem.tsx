import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage,AiFillHeart } from "react-icons/ai";
import useLike from "@/hooks/useLike";
import { FaRegComment } from "react-icons/fa";


interface PostItemProps{
    data:Record<string,any>;
    userId?:string;
    showExactTime?:boolean;
}
const PostItem:React.FC<PostItemProps> = ({data,userId,showExactTime}) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const {data:currentUser} = useCurrentUser();

    const {hasLiked,toggleLike} = useLike({postId:data.id,userId});
    
    const goToUser = useCallback((event:any) =>{
        event.stopPropagation(); 
        router.push(`/users/${data.user.id}`);
    },[router, data?.user?.id]);

    const goToPost = useCallback((event:any) =>{
        router.push(`/posts/${data.id}`);
    },[router,data.id]);

    const onLike = useCallback((event:any)=>{
        event.stopPropagation();
        if(!currentUser){
            return loginModal.onOpen();
        }
        toggleLike();
    },[loginModal, currentUser, toggleLike]);

    const createdAt = useMemo(()=>{
        if(!data?.createdAt)
        {
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt]);

    const exactTime = useMemo(()=>{
        if(!data?.createdAt)
        {
            return null;
        } 
        return format(new Date(data.createdAt),'K:m a - d MMMM yyyy')
    },[data?.createdAt]);
    const LikeIcon = hasLiked?AiFillHeart:AiOutlineHeart;

    return ( 
        <div onClick={goToPost} 
        className="border-b-[1px] border bg-[#585858]/30 border-neutral-800
        m-5 p-4 cursor-pointer transition rounded-md">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data?.user?.id} />
                <div className="w-full">
                    <div className="w-full flex flex-row items-start justify-between">
                        <div className="">
                            <p onClick={goToUser}
                            className="text-white font-semibold cursor-pointer hover:underline
                            montserrat">
                                {data?.user?.name}
                            </p>
                            <p onClick={goToUser}
                            className="text-neutral-500 cursor-pointer hover:underline hidden md:block
                            montserrat">
                                @{data?.user?.username}
                            </p>
                        </div>
                        <span className="text-neutral-500 text-sm montserrat">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data?.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div onClick={onLike}
                        className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer 
                        transition hover:text-red-500">
                            <LikeIcon size={20} color={hasLiked?"red":''}/>
                            <p>{data?.likedIds?.length}</p>
                        </div>
                        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer 
                        transition hover:text-sky-500">
                            <FaRegComment size={20}/>
                            <p>{data?.comments?.length || 0}</p>
                        </div>
                    </div>
                    {showExactTime&&(
                        <div className="mt-2 text-white roboto">
                            {exactTime}
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default PostItem;