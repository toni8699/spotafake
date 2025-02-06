
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
import {forwardRef} from 'react'
import {twMerge} from 'tailwind-merge'

import React from 'react'
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}, ref) => {
    return (
        <button type ={type}
        className={twMerge(`
         rounded-full bg-blue-500
        border border-transparent px-3 py-3
         hover:opacity-75 transition font-bold disabled:cursor-not-allowed disabled:opacity-50 text-black`, className)
        } disabled={disabled} ref ={ref} {...props}>
            {children}
        </button>
    )
})

Button.displayName = 'Button'
export default Button

