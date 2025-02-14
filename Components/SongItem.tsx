"use client"
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/Components/PlayButton";
import {Song} from "@/types";


interface SongItemProps {
    data: Song;
    onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);
    return (
        <div
            onClick={() => onClick(data.id)}
            className={' relative flex group flex-col gap-x-4 w-full rounded-md cursor-pointer p-2 ' +
                'bg-neutral-800/50 hover:bg-neutral-800 transition'}
        >
          <div className ={'w-full h-full relative aspect-square rounded-md overflow-hidden'}>

              <Image src ={imagePath || '/images/liked.jpeg'} fill alt={'Image'}/>
          </div>
            <div className={'flex flex-col items-start gap-y-1 w-full  py-4'}>
                <p className={'font-bold truncate w-full'}>{data.title}</p>
                <p className={'text-neutral-400 text-sm w-full truncate'}>By {data.author}</p>
            </div>
            <div className={'absolute bottom-24 right-5'}>
                <PlayButton/>
            </div>
        </div>
    )}
export default SongItem