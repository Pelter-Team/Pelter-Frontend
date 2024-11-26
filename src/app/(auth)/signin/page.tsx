"use client"
import Link from "next/link"
import Image from "next/image"
import { Input, Button, Form, notification } from "antd"
import Pelter4 from "../../public/Pelter_4.png"
import { useLogin } from "@/features/auth/hooks/useLogin"
import { useUser } from "@/features/auth/provider/UserContext"
import { useRouter } from "next/navigation"

interface SignInFormData {
  email: string
  password: string
}

export default function SignIn() {
  const { setUserState } = useUser?.()!
  const [api, contextHolder] = notification.useNotification()

  const router = useRouter()
  const { loginFlow, error, isPending } = useLogin()
  const onFinish = async (values: SignInFormData) => {
    try {
      const { email, password } = values
      const { response } = await loginFlow({ email, password })
      setUserState({
        user: {
          profileUrl: response.profileUrl,
          userId: response.userId,
          role: response.role,
          username: response.firstname,
          surname: response.surname,
          phone: response.phone || "",
        },
      })

      api.success({ message: "Login success" })

      router.push("/loginsuccess")
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"
      api.error({
        message: "Failed to login",
        description: errorMessage,
      })
    }
  }

  return (
    <div className="flex h-screen">
      {contextHolder}
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

        <Form onFinish={onFinish} className="w-3/4 mt-10">
          {/* mail */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          {/* password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {/* Forget password */}
          <Link
            href="/forgot-password"
            className="text-sm text-lightpinktext hover:text-primary"
          >
            Forgot Password?
          </Link>
          {/* button */}
          <Form.Item className="mt-4">
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              className="w-full bg-pinktext hover:bg-gray-400"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
