import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonSolidProps extends ButtonProps {
    children: ReactNode;
}

export default function ButtonSolid({ children, ...props }: ButtonSolidProps) {
    return (
        <button
            {...props}
            className={`bg-white text-dark font-semibold disabled:opacity-60 px-16 py-4 hover:opacity-80`}
        >
            {children}
        </button>
    );
}