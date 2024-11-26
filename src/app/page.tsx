"use client"
import Link from "next/link"
import Image from "next/image"
import Navbar from "./component/Navbar"
import { useState, useEffect } from "react"
import Pelter1 from "./public/Pelter_1.jpeg"
import Pelter2 from "./public/Pelter_2.png"
import Pelter3 from "./public/Pelter_3.jpeg"

export default function Home() {
  const [white, setWhite] = useState(false)

  const setFixed = () => {
    const threshold = window.innerHeight - 72

    if (window.scrollY >= threshold) {
      setWhite(true)
    } else {
      setWhite(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", setFixed)
    return () => {
      window.removeEventListener("scroll", setFixed)
    }
  }, [])

  return (
    <>
      <Navbar white={white} />
      <div className="bg-primary h-screen relative w-screen flex items-end justify-center">
        <div className="absolute top-[15%] z-20 text-[10rem] text-white font-lobster">
          Pelter
        </div>
        <Image
          src={Pelter2}
          width="1920"
          height="1080"
          className="w-10/12 h-auto z-10"
          alt="LandingPicture"
        />
      </div>

      <div className="flex flex-col bg-white w-screen h-screen items-center px-16 py-24 2xl:px-20 2xl:py-28">
        <div className="text-6xl 2xl:text-7xl font-bold text-primary mb-16 2xl:mb-20">
          Adopting Animal In Thailand
        </div>
        <div className="flex flex-row gap-8 justify-center h-full w-full">
          <Link
            href={{
              pathname: "/petlist",
              query: { free: "true" },
            }}
            className="relative w-2/5 h-full flex items-center justify-center duration-200 ease-in-out hover:scale-105"
          >
            <Image
              src={Pelter1}
              alt="Description of my image"
              width="960"
              height="500"
              sizes="100vw"
              className="w-fit h-auto rounded-md"
            />
            <div className="absolute inset-0 bg-amber-800 opacity-45 rounded-md"></div>
            <div className="w-full h-full absolute flex justify-center items-center text-6xl 2xl:text-7xl font-bold text-white text-center">
              PET FOR FREE
            </div>
          </Link>

          <Link
            href="petlist"
            className="relative w-2/5 h-full flex items-center justify-center duration-200 ease-in-out hover:scale-105"
          >
            <Image
              src={Pelter3}
              alt="Description of my image"
              width="500"
              height="500"
              sizes="100vw"
              className="w-3/5 h-auto rounded-md"
            />
            <div className="absolute inset-0 bg-amber-800 opacity-45 rounded-md"></div>
            <div className="w-full h-full absolute flex justify-center items-center text-6xl 2xl:text-7xl font-bold text-white text-center">
              PET FOR COMERCIAL
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
