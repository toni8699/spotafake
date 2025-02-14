"use client"
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx"
import {HiHome} from "react-icons/hi"
import {BiSearch} from "react-icons/bi"
import Button from "@/Components/Button";
import Image from "next/image";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useUser} from "@/hooks/useUser";
import {FaUserAlt} from "react-icons/fa";
import {toast} from "react-hot-toast";

import useAuthModal from "@/hooks/useAuthModal";
interface HeaderProps{
    children:React.ReactNode,
    className?:string
}
import { useRouter } from "next/navigation";
import React from "react";
export const Header:React.FC<HeaderProps> = ({children,className}) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const {user,subscription}=useUser();
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();
        if (error) {
            toast.error(error.message)
        }else{
            toast.success('Logged out')
        }
    }
    return (
        <div className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-blue-600
        p-6   `, className)}>
            <div className={'w-full mb-4 ' +
                'flex items-center justify-between'}>
                <div className={'hidden md:flex gap-x-2 items-center'}>
                    <button onClick={() => router.back()}
                            className={'bg-black rounded-full flex items-center justify-center hover:opacity-75 transition'}>
                        <RxCaretLeft className={'text-white'} size={28}/>
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className={'bg-black rounded-full flex items-center justify-center hover:opacity-75 transition'}>
                        <RxCaretRight className={'text-white'} size={28}/>
                    </button>
                </div>
                <div className={'flex md:hidden gap-x-2 items-center'}>
                    <button onClick={() => router.push('/')}
                        className={'bg-black rounded-full flex items-center p-2 justify-center hover:opacity-75 transition'}>
                        <HiHome className={'text-white'} size={20}/>
                    </button>
                    <button onClick ={() => router.push('/search')}
                        className={'bg-black rounded-full flex items-center p-2 justify-center hover:opacity-75 transition'}>
                        <BiSearch className={'text-white'} size={20}/>
                    </button>
                </div>
                <div className={'flex justify-between items-center gap-x-4 '}>
                    {user ? (
                        <div className={'flex gap-x-4 items-center'}>
                            <Button onClick={handleLogout} className={'text-white py-2 px-6'}>Logout</Button>
                           <Button onClick={()=>router.push('/account')} className={'bg-white'}>
                               <FaUserAlt/>
                           </Button>
                        </div>
                    ) :(
                    <>
                    <div>
                        <Button onClick={authModal.onOpen} className={'text-neutral-50 font-medium bg-transparent'}>
                            Sign up
                        </Button>
                    </div>
                    <div>
                        <Button onClick={authModal.onOpen} className={'py-2 px-5 bg-white '}>
                            Log in
                        </Button>
                    </div>
                    </>
                    )}
                </div>
            </div>
            {children}

        </div>
    )
}
export default Header