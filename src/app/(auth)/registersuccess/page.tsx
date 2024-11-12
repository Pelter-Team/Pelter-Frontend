"use client"
import Image from "next/image"
import { Button } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import Pelter4 from "../../public/Pelter_4.png"

export default function Successfully() {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-[#E9C9C1] p-8">
        <h2 className="text-3xl font-semibold text-browntext font-lobster mt-7">
          Pelter
        </h2>
        <p className="text-xl mt-8 font-semibold  text-pinktext">
          A place dedicated to pets lover.
        </p>
        <p className="mt-2 text-pinktext">
          Sign up is simple, free and fast. One place to manage everything, and
          everyone
        </p>
        <div className="absolute bottom-0">
          <Image
            src={Pelter4}
            alt="Pelter Logo"
            className="max-w-[700px] max-h-[800px] w-auto h-auto"
          />
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 ">
        <h1 className="text-3xl  text-browntext">Welcome to Pelter 👋</h1>
        <h1 className=" text-2xl text-black mt-10">Successfully Registered</h1>
        <h3 className="text-xl text-black mt-3">Explore your lovely pet</h3>
        <CheckCircleOutlined
          className="mt-10 "
          style={{ fontSize: "100px", color: "#C5705D" }}
        />
        <Button
          type="primary"
          href="/"
          className="text-l w-1/2 bg-pinktext hover:bg-gray-400 mt-10"
        >
          Back to home Page
        </Button>
      </div>
    </div>
  )
}
