
"use client"

import {Song} from "@/types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";

interface MediaItemProps {
    data:Song;
    onClick?:(id:string) => void;
}
const MediaItem:React.FC<MediaItemProps> = ({
    data,
    onClick,
}) => {
    const imagePath = useLoadImage(data);
    const handleClick=()=>{
        if (onClick) {
            return onClick(data.id);
        }
    }
    return (
        <div onClick={handleClick}
             className={'flex flex-row gap-x-3' +
                 ' items-center' +
                 ' rounded-md' +
                 'bg-neutral-800/10 cursor-pointer w-full hover:bg-neutral-500/20 transition p-2'}>

            <div
                className={'relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'}>
                <Image
                    fill
                    src={imagePath || '/images/liked.jpeg'}
                    alt={'Image'}
                />
            </div>
            <div
                className={'flex flex-col gap-y-1 w-full'}>
                <p className={'text-white truncate'}>
                    {data.title}
                </p>
                <p className={'text-neutral-400 text-sm truncate'}>
                    {data.author}
                </p>
            </div>
        </div>
    )
}
export default MediaItem