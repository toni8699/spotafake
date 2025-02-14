"use client";
import {TbPlaylist} from "react-icons/tb"
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import {useUser} from "@/hooks/useUser";
import {Song} from "@/types";
import React from "react";
import MediaItem from "@/Components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import LikeButton from "@/Components/LikeButton";


interface LibraryProps {
    songs:Song[]
}
const Library:React.FC<LibraryProps> = (
    { //Props
        songs
    }) => {
    const authModal = useAuthModal();
    const {user,subscription } = useUser();
    const uploadModal = useUploadModal();

    const onPlay = useOnPlay(songs);
    const onClick=()=>{
        //add auth
        if(!user){
            return authModal.onOpen();
        }
        //Check for subscription
        return uploadModal.onOpen();
    }
    if (songs.length === 0) {
        return (
            <div>
                <div className={'flex items-center justify-between px-5 pt-4'}>
                    <div className={'flex items-center gap-x-2'}>
                        <TbPlaylist size={26} className={'text-neutral-400'}/>
                        <p className={'text-neutral-400 font-medium text-md'}>
                            Your Library
                        </p>
                    </div>
                    <AiOutlinePlus
                        onClick={onClick}
                        size={20}
                        className={'text-neutral-400 cursor-pointer hover:text-white transition'}
                    />
                </div>
                <div className={'flex flex-col gap-y-2 mt-7 px-3 text-white'}>
                    <p className={`text-neutral-400`}>Woah it's empty here, add a song</p>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className={'flex items-center justify-between px-5 pt-4'}>
                <div className={'flex items-center gap-x-2'}>
                    <TbPlaylist size={26} className={'text-neutral-400'}/>
                    <p className={'text-neutral-400 font-medium text-md'}>
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className={'text-neutral-400 cursor-pointer hover:text-white transition'}
                />
            </div>
            <div className={'flex flex-col gap-y-2 mt-7 px-3 text-white'}>
                {songs.map((song) => (
                    <div key={song.id} className={`flex items-center justify-between`}>
                    <MediaItem onClick={(id: string) => onPlay(id)}
                        key={song.id}
                        data={song}
                        />
                        <LikeButton songID={song.id}/>
                    </div>
                ))}
            </div>
        </div>
    )

}


export default Library