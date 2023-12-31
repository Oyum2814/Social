import prismadb from '@/libs/prismadb'
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse)
{
    if(req.method!=='POST' && req.method!=='DELETE'){
        return res.status(405).end();
    }
    try{
        const {postId} = req.body;
        const {currentUser} = await serverAuth(req,res);
        if(!postId || typeof postId != 'string'){
            throw new Error('Invalid ID');
        }

        let post: any;

        post = await prismadb.post.findUnique({
            where: {
                id: postId
            }
        });

        if(!post){
            throw new Error('Invalid ID');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        if(req.method==='POST'){
            updatedLikedIds.push(currentUser?.id); 
            try{
                if(post?.userId && post?.userId!==currentUser?.id){
                    await prismadb.notification.create({
                        data:{
                            body:`${currentUser?.name} liked your tweet`,
                            userId:post.userId
                        }
                    });
                    await prismadb.user.update({
                        where:{
                            id:post.userId
                        },
                        data:{
                            hasNotification:true,
                        }
                    })
                }

            }  
            catch(error) {
                console.log(error);
            }
        }
        if(req.method==='DELETE'){
            updatedLikedIds =await Promise.all(updatedLikedIds.filter((likedId)=>{
                likedId !== currentUser?.id
            }));
        }
        const updatedPost =await prismadb.post.update({
            where:{
                id:postId
            },
            data:{
                likedIds : updatedLikedIds
            }
        });
        return res.status(200).json(updatedPost);
    }
    catch(error){
        console.log(error);
        return res.status(400).end();
    }
}