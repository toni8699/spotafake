"use client"

import { Song } from "@/types";
import SongItem from "./SongItem";
import MediaItem from "@/Components/MediaItem";
import LikeButton from "@/Components/LikeButton";
import React from "react";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    if (songs.length === 0) {
        return (
            <div className={'mt-4 text-neutral-400'}>
                No songs found
            </div>
        );
    }
    return (
        <div className={'flex flex-col gap-y-2 mt-4 px-6' +
            ' 2xl:grid-cols-8 gap-4 mt-4 '}>
            {songs.map((song) => (
                <div className={'flex items-center justify-between gap-x-4 w-full'} key={song.id}>

                    <div className={'flex-1'}>
                        <MediaItem  data={song} onClick={() => {}}/>

                    </div>
                    <LikeButton songID={song.id}/>
                </div>

            ))}
        </div>
    );
}
export default SearchContent