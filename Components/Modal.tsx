import * as Dialog from '@radix-ui/react-dialog'

import {IoMdClose} from "react-icons/io";

interface ModalProps {
    isOpen: boolean,
    onChange : (open: boolean) => void;
    title : string;
    children: React.ReactNode;
    description : string
}
const Modal : React.FC<ModalProps> =
    ({
         isOpen,
         onChange,
         children,
        title,
         description
    }) => {
    return (
        <Dialog.Root
        open = {isOpen}
        onOpenChange={onChange}
        defaultOpen = {isOpen}
        >
            <Dialog.Portal>
                <Dialog.Overlay className ='
                bg-neutral-900/90
                backdrop-blur-sm fixed inset-0'/>
                <Dialog.Content className ='
                fixed drop-shadow-md border border-neutral-700
                top-[50%] left-[50%] max-h-full h-full md:h-auto
                md:w-[90vw] md:max-w-[450px]
                md:max-h-[85vh] w-full
                translate-x-[-50%] translate-y-[-50%]
                rounded-md hover:outline-none bg-neutral-800 p-6'>
                    <Dialog.Title className ='
                    text-xl text-center font-bold mb-4'>
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className ='
                    mb-5 text-sm leading-normal text-center'>
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button className ='
                        text-neutral-400 hover:text-white
                        transition absolute top-[10px] right-[10px]
                        inline-flex h-[25px] w-[25px] appearance-none
                        items-center justify-center rounded-full
                        focus:outline-none'>
                            <IoMdClose/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )
}
export default Modal