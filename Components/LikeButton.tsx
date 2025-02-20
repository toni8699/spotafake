import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { useSessionContext} from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {toast} from "react-hot-toast";

interface LikeButtonProps {
    songID?: string
}

const LikeButton: React.FC<LikeButtonProps> = ( {songID}) => {
    const router = useRouter();
    const {supabaseClient} = useSessionContext();
    const authModal = useAuthModal();
    const {user} = useUser();
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        if (!user?.id) {
            return;
        }
        const fetchData = async () => {
            const {data, error} = await supabaseClient
                .from('Liked Songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songID)
                .single();
            if(!error && data){
                setIsLiked(true);
                router.refresh();
            }
        };
        fetchData();
    }, [songID, supabaseClient, user?.id]);
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }
        if (isLiked) {
            const {error } = await supabaseClient
                .from('Liked Songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songID);
            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
                router.refresh();

            }
        } else {
            const {error} = await supabaseClient
                .from('Liked Songs')
                .insert({
                    user_id: user.id,
                    song_id: songID
                });
            if (error) {
                toast.error(error.message);
            } else {
                toast.success('Liked');
                setIsLiked(true);
                router.refresh();


            }
        }

    }

    return (
        <button onClick={handleLike}
                className={'cursor-pointer hover:opacity-75 transition'}>
            <Icon color={isLiked ? '#3b82f6' : 'white'} size={25}/>
        </button>
    )
}
export default LikeButton