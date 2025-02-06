"use client"
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx"

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
        from-emerald-800
        p-6   `,className)}>
            <div className={'w-full mb-4 ' +
                'flex items-center justify-between'}>
                <div className={'hidden md:flex gap-x-2 items-center'}>
                    <button>
                        <RxCaretLeft
                            onClick={() => router.back()}
                            size={28}
                            className={'text-white cursor-pointer  hover:opacity-70 bg-black rounded-full transition'}
                        />
                    </button>
                    <button>
                        <RxCaretRight
                            onClick={() => router.back()}
                            size={28}
                            className={'text-white cursor-pointer bg-black rounded-full hover:opacity-70 transition'}
                        />
                    </button>
                </div>
            </div>

        </div>
    )
}
export default Header