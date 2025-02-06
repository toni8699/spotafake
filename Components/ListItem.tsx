"use client"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {FaPlay} from "react-icons/fa"
interface ListItemProps {
    imageUrl:string;
    name:string;
    href:string
}
import React from 'react'

const ListItem:React.FC<ListItemProps> = ({imageUrl,name,href}) => {
    const router = useRouter();
    const onClick=()=>{
        //add auth
        router.push(href)
    }
    return (
        <button className={'relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition' +
            ''}>
            <div className={'relative min-h-[64px] min-w-[64px]'}>
                <Image
                    src={imageUrl}
                    className={'object-cover w-24 h-24 rounded-md'}
                    fill
                    alt={'Image'}
                />
            </div>
            <p className={'font-medium truncate py-5'}>
                {name}
            </p>
            <div className={'absolute ' +
                'transition opacity-0 rounded-full flex items-center justify-center bg-blue-500 p-4 drop-shadow-md ' +
                'right-5 group-hover:opacity-100 hover:scale-110 group-hover:drop-shadow-xl:'}>
                <FaPlay/>
            </div>
        </button>

    )}
export default ListItem
