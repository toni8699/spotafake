import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useSession, useSessionContext} from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import {useUser} from "@/hooks/useUser";
import {toast} from "react-hot-toast";

interface DeleteButtonProps {
    songID?: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ( {songID}) => {
    const router = useRouter();
    const {supabaseClient} = useSessionContext();
    const authModal = useAuthModal();
    const {user} = useUser();
    useEffect(() => {
        if (!user?.id) {
            return;
        }
        const fetchData = async () => {
            const {data, error} = await supabaseClient
                .from('Songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songID)
                .single();
        };
        fetchData();
    }, [songID, supabaseClient, user?.id]);
    // const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
    const handleDelete = async () => {
        if (!user) {
            return authModal.onOpen();
        }
        const {error } = await supabaseClient
            .from('Songs')
            .delete()
            .eq('user_id', user.id)
            .eq('song_id', songID);
        if (error) {
            toast.error(error.message);
        }
    }

    return (
        <button onClick={handleDelete}
                className={'cursor-pointer hover:opacity-75 transition'}>
            Delete
        </button>
    )
}
export default DeleteButton