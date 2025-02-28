'use client'

import React from "react";
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "@/Components/PlayerContent";



const Player = () => {
    const player =usePlayer();
    const {song} =useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div className={`fixed bottom-0 
        bg-black w-full py-2 h-[100px] px-2`}>
            <PlayerContent key={songUrl} song={song} songUrl={songUrl}/>
        </div>
    );
};

export default Player