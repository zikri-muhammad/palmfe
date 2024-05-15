"use client"

import { useAppSelector } from "@/stores/hooks"
import { useEffect, useState } from "react";

export default function SuccessPage() {

    const book = useAppSelector((state) => state.book);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (!book.success) {
            window.location.href = "/"
        }
    }, [book.success])

    useEffect(() => {
        if (countdown === 0) {
            window.location.href = "/"
        }
    }, [countdown, history]);

    return (
        <div className="space-y-4">
            <div className="text-5xl font-bodoni-moda font-light">
                Thank you, {book?.success?.name?.split(" ")[0]}
            </div>
            <div className="space-y-12">
                <div className="space-y-4">
                    <p className="font-inter text-lg">You're In!</p>
                    <p className="font-inter text-lg">
                        Your store visit is booked and you're ready to ride the shopping wave. Here’s your detail:
                    </p>
                </div>
                <div className="space-y-4 w-full">
                    <div className="grid grid-cols-2 w-full font-inter">
                        <div>
                            <div className="opacity-60">Name :</div>
                            <div>{book?.success?.name}</div>
                        </div>
                        <div>
                            <div className="opacity-60">Country :</div>
                            <div>{book?.success?.country?.flag}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 w-full font-inter">
                        <div>
                            <div className="opacity-60">Email :</div>
                            <div>{book?.success?.email}</div>
                        </div>
                        <div>
                            <div className="opacity-60">Visit date :</div>
                            <div>{book?.success?.created_at}</div>
                        </div>
                    </div>
                </div>
                <div>
                    We look forward to seeing you at the #Swellmatch store! Your booking details already sent to your email and whatsapp
                </div>
                <p className="opacity-60 text-sm">
                    This form will refresh automatically in {countdown} seconds
                </p>
            </div>
        </div>
    )
}