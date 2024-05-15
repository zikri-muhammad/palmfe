import React, { PropsWithChildren, InputHTMLAttributes } from 'react';

type InputFieldProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>>;

export default function InputField({ error, ...props }: InputFieldProps & { error?: string }) {
    return (
        <div className='w-full'>
            <input
                className={`bg-neutral-900 ${error ? "border border-red-600": ""} appearance-none ring-0 px-4 py-4 focus-visible:ring-0 outline-none w-full focus-visible:border-0`}
                {...props}
            />
            {
                error && <div className="text-red-500 text-sm p-1">{error}</div>
            }
        </div>
    )
}
