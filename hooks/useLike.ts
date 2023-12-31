import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import axios from "axios";

const useLike = ({postId,userId}:{postId:string,userId?:string})=>{
    const {data : currentUser } = useCurrentUser();
    const {data: fetchedPost,mutate:mutateFetchedPost} = usePost(postId);
    const {mutate:mutateFetchedPosts} = usePosts(userId);
    
    const loginModal = useLoginModal();

    const hasLiked = useMemo(()=>{
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id);
    },[currentUser?.id, fetchedPost?.likedIds]);

    const toggleLike = useCallback(async()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        try{
            let request;

            if(hasLiked){
                request = ()=>axios.delete('/api/like',{data:{postId}});
            }
            else
            {
                request = ()=>axios.post('/api/like',{postId});
            }
            
            toast.success(hasLiked ? 'Unliked!' : 'Liked!');
            await request();
            mutateFetchedPosts();
            mutateFetchedPost();
        }
        catch(error) {
            toast.error('Something Went Wrong')
        }
    },[currentUser,hasLiked,postId,mutateFetchedPosts,mutateFetchedPost,loginModal]);

    return {hasLiked,toggleLike};
};

export default useLike;