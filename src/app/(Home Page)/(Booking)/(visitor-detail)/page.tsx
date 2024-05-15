"use client"

import ButtonSolid from "@/components/button/solid";
import InputField from "@/components/input/field";
import InputSelect from "@/components/input/select";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setBook } from "@/stores/slice/bookSlice";
import { getCountry } from "@/stores/slice/countrySlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {

  const router = useRouter()
  const book = useAppSelector((state) => state.book)
  const country = useAppSelector((state) => state.country)

  const dispatch = useAppDispatch()
  const [form, setForm] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value || e.target.select
    })
  }

  useEffect(() => {
    dispatch(getCountry())

    book.payload && setForm(book.payload)
  }, [book.payload])

  const handleSubmit = () => {
    dispatch(setBook(form))
    router.push("/surfing-experiences")
  }

  return (
    <div className="font-inter py-4 space-y-12">
      <h2>1/3: VISITOR DETAILS</h2>
      <div className="grid grid-cols-2 gap-8">
        <InputField error={book?.error?.name} value={form?.name || ""} onChange={handleChange} name="name" placeholder="Name" />
        <InputSelect value={form?.country_id || ""} name="country_id" options={country.source} onChange={handleChange} />
        <InputField error={book?.error?.email} value={form?.email || ""} onChange={handleChange} name="email" placeholder="Email" />
        <InputField error={book?.error?.phone} value={form?.phone || ""} onChange={handleChange} type="number" name="phone" placeholder="Whatsapp number" />
      </div>
      <ButtonSolid onClick={handleSubmit}>
        Next
      </ButtonSolid>
    </div>
  );
}
