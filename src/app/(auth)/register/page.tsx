"use client";
import Link from "next/link";
import Image from "next/image";
import { Tabs } from "antd";
import Pelter4 from "../../public/Pelter_4.png";
import RegisterContent from "../_component/RegisterContent"
import FoundationContent from "../_component/FoundationContent"

export default function SignUp() {

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-[#E9C9C1] p-8">
        <h2 className="text-3xl font-semibold text-browntext font-lobster mt-7">
          Pelter
        </h2>
        <p className="text-xl mt-8 font-semibold text-pinktext">
          A place dedicated to pet lovers.
        </p>
        <p className="mt-2 text-pinktext">
          Sign up is simple, free, and fast. One place to manage everything, and everyone.
        </p>
        <div className="absolute bottom-0">
          <Image
            src={Pelter4}
            alt="Pelter Logo"
            className="max-w-[700px] max-h-[800px] w-auto h-auto"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <h3 className="text-3xl font-semibold text-browntext">
          Welcome to Pelter 👋
        </h3>
        <p className="text-browntext mt-2">
          Already have an account?
          <Link href="/signin" className="font-semibold ml-1 mr-1">
            Sign In
          </Link>
          here.
        </p>

          <Tabs
            defaultActiveKey="individual"
            centered
            tabBarStyle={{ color: "#C5705D" }}
            className="custom-tabs"
          >
            <Tabs.TabPane tab="Individual" key="individual">
                <RegisterContent/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Foundation" key="foundation">
                <FoundationContent/>
            </Tabs.TabPane>
          </Tabs>

      </div>
    </div>
  );
}
