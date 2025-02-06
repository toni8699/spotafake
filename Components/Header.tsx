"use client"
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx"
import {HiHome} from "react-icons/hi"
import {BiSearch} from "react-icons/bi"
import Button from "@/Components/Button";
interface HeaderProps{
    children:React.ReactNode,
    className?:string
}
import { useRouter } from "next/navigation";
export const Header:React.FC<HeaderProps> = ({children,className}) => {
    const router = useRouter();
    const handleLogout = () => {

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
                    <button
                        className={'bg-black rounded-full flex items-center p-2 justify-center hover:opacity-75 transition'}>
                        <HiHome className={'text-white'} size={20}/>
                    </button>
                    <button
                        className={'bg-black rounded-full flex items-center p-2 justify-center hover:opacity-75 transition'}>
                        <BiSearch className={'text-white'} size={20}/>
                    </button>


                </div>
                <div className={'flex justify-between items-center gap-x-4 '}>
                    <>
                    </>
                    <div>
                        <Button onClick={()=>{}} className={'text-neutral-50 font-medium bg-transparent'}>
                            Sign up
                        </Button>


                    </div>
                    <div>
                        <Button onClick={()=>{}} className={'py-2 px-5 bg-white '}>
                            Log in
                        </Button>

                    </div>

                </div>


            </div>
            {children}

        </div>
    )
}
export default Header