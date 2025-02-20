"use client"
import {Song} from "@/types";
import SongItem from "@/Components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
   if (songs.length === 0) {
       return (
           <div className={'mt-4 text-neutral-400'}>
               Your library is empty
           </div>
       );
   }
    return (
        <div className={'grid grid-cols-2 xl:grid-cols-5 overflow-hidden overflow-y-auto  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4' +
            ' 2xl:grid-cols-8 gap-4 mt-4 '}>
            {songs.map((song) => (
                <SongItem key={song.id} data={song} onClick={(id => onPlay(id))}/>
            ))}

        </div>
    );
}

export default PageContent