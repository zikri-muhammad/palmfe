import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function InputFile({ change, name }: {
    change: any,
    name: string
}) {
    const [files, setFiles] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const files = event.dataTransfer.files[0]
        setFiles(files)
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    useEffect(() => {
        if (files) {
            change && change({
                target: {
                    name: name,
                    value: files
                }
            })
        } else {
            change && change({
                target: {
                    name: name,
                    value: null
                }
            })
        }
    }, [files])

    const convertSize = (size: number): string => {
        if (size < 1024) {
            return size + " KB";
        } else if (size < 1048576) {
            return (size / 1024).toFixed(2) + " MB";
        } else {
            return (size / 1048576).toFixed(2) + " GB";
        }
    };

    return (
        <div className="w-full">
            {
                !files ? (
                    <div
                        onClick={() => inputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="py-6 bg-neutral-900 hover:opacity-80 cursor-pointer"
                    >
                        <div className="flex flex-col items-center space-y-6 justify-center">
                            <div className="space-y-2">
                                <div className="text-center text-lg font-inter-semi-bold">
                                    Drag & Drop
                                </div>
                                <div className="text-[#6A6A6A]">
                                    or select files from device max. 2MB
                                </div>
                            </div>
                            <div className="underline text-lg">
                                Upload
                            </div>
                        </div>
                        <input
                            name={name!}
                            onChange={(e) => setFiles(e.target?.files?.[0] ?? null)}
                            ref={inputRef}
                            type="file"
                            className="hidden"
                        />
                    </div>
                ) : (
                    <div className="flex w-full items-center bg-neutral-900 p-4">
                        <div className="w-10 h-10">
                            <Image alt="file" src={require("@/assets/icon/file.svg")} />
                        </div>
                        <div className="flex-grow">
                            <div className="font-inter-semi-bold">
                                {files?.name ?? "No file selected"}
                            </div>
                            <div className="text-neutral-400 text-sm">
                                {convertSize(files?.size / 1000)}
                            </div>
                        </div>
                        <div onClick={() => setFiles(null)} className="cursor-pointer hover:opacity-70">
                            <Image alt="file" src={require("@/assets/icon/close.svg")} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}