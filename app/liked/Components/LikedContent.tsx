'use client'
import {Song} from "@/types";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useUser} from "@/hooks/useUser";
import MediaItem from "@/Components/MediaItem";
import LikeButton from "@/Components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
    song:   Song[]
}

const LikedContent  : React.FC<LikedContentProps> = ({
     song}) => {
    const {isLoading, user} = useUser();
    const onPlay = useOnPlay(song);

    const router = useRouter()
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [    user, isLoading, router]);
    if (song.length ===0){
        return (
            <div className={'flex flex-col gap-y-2 w-full px-6 text-neutral-400'}>
                Woah it&#39;s empty here, go like something !
            </div>
        )
    }
    return (
        <div className={`
        flex flex-col gap-y-2 w-full px-6 text-neutral-400`}>
            {song.map ((song) => (
                <div key={song.id} className={`flex items-center gap-x-4 w-full`}>
                    <div className={'flex-1'}>
                        <MediaItem data={song} onClick={(id) => onPlay(id)}/>
                    </div>
                    <div>
                        <LikeButton songID={song.id}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LikedContent