"use client";
import Link from "next/link";
import Image from "next/image";
import { Input, Button, Form } from "antd";
import Pelter4 from "../../public/Pelter_4.png";

export default function SignIn() {
  return (

    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-[#E9C9C1] p-8">
        <h2 className="text-3xl font-semibold text-browntext mt-7">
          Pelter
        </h2>
        <p className="text-xl mt-8 font-semibold  text-pinktext">
          A place dedicated to pets lover.
        </p>
        <p className="mt-2 text-pinktext">
          Sign up is simple, free and fast. One place to manage everything, and everyone.
        </p>
        <div className="absolute bottom-0">
          <Image src={Pelter4} alt="Pelter Logo" className="max-w-[500px] max-h-[500px] w-auto h-auto"/>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 ">

        <h3 className="text-3xl font-semibold text-browntext">
          Welcome Back to Pelter 👋
        </h3>
        <p className="text-browntext mt-2">
          Doesn’t have one yet? 
          <Link href="/register" className="font-semibold ml-1 mr-1">
            Register 
          </Link> 
          your account.
        </p>

        <Form className="w-3/4 mt-10">
          {/* mail */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          {/* password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}>
            <Input.Password placeholder="Password"/>
          </Form.Item>
          {/* Forget password */}
          <div className="flex justify-between text-sm text-lightpinktext">
            <Link href="/forgot-password" >
              Forgot Password?
            </Link>
          </div>
          {/* button */}
          <Form.Item className="mt-4">
            <Button type="primary" htmlType="submit" className="w-full bg-pinktext hover:bg-gray-400">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
      
    </div>
  );
}
