"use client"

import { useAppSelector } from "@/stores/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function BookingLayout({ children }: { children: React.ReactNode }) {

    const book = useAppSelector((state) => state.book)
    const router = useRouter()

    const fieldHome = ["name", "country_id", "email", "phone"]
    const filedSurfing = ["surfing_experience", "visit_date", "desired_board"]
    const fieldVerification = ["upload_ktp"]

    useEffect(() => {
        if (book.error) {
            Object.keys(book.error).forEach(field => {
                if (fieldHome.includes(field)) {
                    router.replace("/")
                } else if (filedSurfing.includes(book.error)) {
                    console.log("Return to Surfing Page")
                } else if (fieldVerification.includes(book.error)) {
                    router.replace("/id-verification")
                }
            });
        }
    }, [book.error])


    return (
        <div>
            <p className="text-5xl font-bodoni-moda font-light">Book Your Visit</p>
            {children}
        </div>
    )
}