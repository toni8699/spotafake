import {forwardRef} from "react";
import {twMerge} from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}





const Input =forwardRef<HTMLInputElement,InputProps>(({
    className,
    type,
    disabled,
    ...props
},ref) => {
    return (
        <input
            type={type}
            className={twMerge(`
            flex
            rounded-md
            bg-neutral-700
            border-2
            px-3
            py-3
            border-transparent
            focus:border-sky-500
            focus:bg-neutral-800
            transition
            file:border-0
            file:bg-transparent
            file:font-medium
            placeholder:text-neutral-400 
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-white
            w-full
            p-2
            `,className)}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    )
})
export default Input