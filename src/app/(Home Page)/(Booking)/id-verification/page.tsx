"use client"

import ButtonSolid from "@/components/button/solid";
import InputFile from "@/components/input/file";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { addBook, addFile, setBook } from "@/stores/slice/bookSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {

  const router = useRouter()
  const book = useAppSelector((state) => state.book)
  const dispatch = useAppDispatch()
  const [form, setForm] = useState<any>(null)

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    book.payload && setForm(book.payload)
  }, [book.payload])

  const handleSubmit = () => {
    dispatch(addFile(form)).then((data) => {
      if (data.payload) {
        dispatch(setBook({
          "upload_ktp": data.payload.file_url
        }))
        dispatch(addBook()).then((data) => {
          if (data.payload?.success) {
            router.replace("/success")
          }
        })
      }
    })
  }

  return (
    <div className="font-inter py-4 space-y-12">
      <h2>3/3: ID VERIFICATION</h2>
      <p>Help us verify your identity by uploading a photo of your ID/KTP or Passport</p>
      <InputFile name="document" change={handleChange} />
      <div className="flex space-x-4 justify-between items-center">
        <ButtonSolid disabled={!form?.document || book?.loading} onClick={handleSubmit}>
          Book my visit
        </ButtonSolid>
        {
          book.loading && (
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.1" width="1.66667" height="5" rx="0.833333" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 20 10.8333)" fill="white" />
              <rect opacity="0.8" width="1.66667" height="5" rx="0.833333" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 5 10.8333)" fill="white" />
              <rect opacity="0.4" width="1.66667" height="5" rx="0.833333" transform="matrix(1 5.56363e-08 5.56363e-08 -1 9.16663 20)" fill="white" />
              <rect opacity="0.02" width="1.66667" height="5" rx="0.833333" transform="matrix(1 5.56363e-08 5.56363e-08 -1 9.16663 5)" fill="white" />
              <rect opacity="0.2" width="1.66667" height="5" rx="0.833333" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 16.4818 17.6603)" fill="white" />
              <rect width="1.66667" height="5" rx="0.833333" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 5.87524 7.05371)" fill="white" />
              <rect opacity="0.6" width="1.66667" height="5" rx="0.833333" transform="matrix(0.707107 0.707107 0.707107 -0.707107 2.33972 16.4818)" fill="white" />
              <rect opacity="0.05" width="1.66667" height="5" rx="0.833333" transform="matrix(0.707107 0.707107 0.707107 -0.707107 12.9463 5.87524)" fill="white" />
            </svg>
          )
        }

      </div>
    </div>
  );
}
