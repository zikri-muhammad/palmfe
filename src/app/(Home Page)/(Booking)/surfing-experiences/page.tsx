"use client"

import ButtonSolid from "@/components/button/solid";
import InputField from "@/components/input/field";
import InputSelect from "@/components/input/select";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setBook } from "@/stores/slice/bookSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SurfingExperiencesPage() {

    const router = useRouter()
    const book = useAppSelector((state) => state.book)
    const dispatch = useAppDispatch()
    const [form, setForm] = useState<any>(null)
    const [board, setBoard] = useState<number>(1)

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        console.log(board);
        
    }, [board])

    useEffect(() => {
        if (book.payload) {
            setForm({
                ...form,
                ...book.payload,
                surfing_experience: Number(book.payload.surfing_experience)
            })
            setBoard(Number(book.payload.surfing_experience))
        }
    }, [book.payload])

    const handleSubmit = () => {
        dispatch(setBook(form))
        router.push("/id-verification")
    }

    return (
        <main className="font-inter py-4 space-y-12">
            <h2>2/3: SURFING EXPERIENCES</h2>
            <div className="space-y-4">
                <p>Your Sufing Experience</p>
                <div className="w-full h-[4.5rem] relative">
                    <div className="w-full grid grid-cols-11">
                        {
                            Array.from({ length: 11 }).map((_, i) => (
                                <div key={i} onClick={() => {
                                    setBoard(i + 1)
                                    setForm({
                                        ...form,
                                        surfing_experience: i + 1
                                    })
                                }} className={`w-full cursor-pointer hover:opacity-80 flex justify-center ${board == i + 1 ? "font-inter-bold mb-2 text-lg" : ""}`}>
                                    {i}
                                </div>
                            ))
                        }
                    </div>
                    <div className="absolute z-10 w-full bottom-0">
                        <div className="w-full grid h-full relative grid-cols-11">
                            <div className="absolute bottom-0 w-full grid grid-cols-11">
                                <div className={`flex justify-end col-span-${board} pr-1`}>
                                    <Image className={`relative`} src={require("@/assets/icon/board.svg")} alt="board" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full absolute bottom-5 bg-gradient-to-r h-2 from-white to-[#05B3BE]" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <InputField value={form?.visit_date || ""} onChange={handleChange} name="visit_date" type="date" placeholder="Visit Date" />
                    <InputSelect options={[
                        {
                            id: "longboard",
                            name: "longboard"
                        },
                        {
                            id: "funboard",
                            name: "funboard"
                        },
                        {
                            id: "shortboard",
                            name: "shortboard"
                        },
                        {
                            id: "fishboard",
                            name: "fishboard"
                        },
                        {
                            id: "gunboard",
                            name: "gunboard"
                        },
                    ]} value={form?.desired_board || ""} onChange={handleChange} name="desired_board" />
                </div>
            </div>
            <ButtonSolid onClick={handleSubmit}>
                Next
            </ButtonSolid>
        </main >
    )
}