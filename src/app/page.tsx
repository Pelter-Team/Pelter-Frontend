"use client"
import Link from "next/link"
import { CldImage } from "next-cloudinary"

export default function Home() {
  return (
    <>
      <div className="bg-[#C5705D] h-screen relative w-screen flex items-end justify-center">
        <div className="absolute italic top-[15%] z-20 text-9xl font-bold text-white">
          Pelter
        </div>
        <CldImage
          src="Pelter_2"
          alt="Description of my image"
          width="960"
          height="600"
          className="w-10/12 h-auto z-10"
          sizes="100vw"
        />
      </div>

      <div className="flex flex-col bg-white w-screen h-screen items-center p-20">
        <div className="text-7xl font-bold text-amber-700 mb-20">
          Adopting Animal In Thailand
        </div>
        <div className="flex flex-row gap-8 justify-center h-full w-full">
          <Link href="/" className="relative w-2/5 flex items-center justify-center duration-200 ease-in-out hover:scale-105">
            <CldImage
              src="Pelter_1"
              alt="Description of my image"
              width="960"
              height="600"
              sizes="100vw"
              className="rounded-md"
            />
            <div className="absolute inset-0 bg-amber-800 opacity-45 rounded-md"></div>
            <div className="w-full h-full absolute flex justify-center items-center text-7xl font-bold text-white text-center">PET FOR FREE</div>
          </Link>

          <Link href="/" className="relative w-2/5 flex items-center justify-center duration-200 ease-in-out hover:scale-105">
            <CldImage
              src="Pelter_3"
              alt="Description of my image"
              width="500"
              height="500"
              sizes="100vw"
              className="rounded-md"
            />
            <div className="absolute inset-0 bg-amber-800 opacity-45 rounded-md"></div>
            <div className="w-full h-full absolute flex justify-center items-center text-7xl font-bold text-white text-center">PET FOR COMERCIAL</div>
          </Link>
        </div>
      </div>
    </>
  )
}
