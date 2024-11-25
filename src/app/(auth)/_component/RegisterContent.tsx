import { Input, Button, Form, Checkbox, Select, notification } from "antd"
import { useState, useEffect } from "react"
import type { FormInstance } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/features/auth/provider/UserContext"
import { useRegister } from "@/features/auth/hooks/useRegister"

interface SubmitButtonProps {
  form: FormInstance
  isLoading?: boolean
}
export const SubmitButton: React.FC<
  React.PropsWithChildren<SubmitButtonProps>
> = ({ form, children, isLoading }) => {
  const [submittable, setSubmittable] = useState<boolean>(false)
  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [values, form])

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      className="w-full text-white bg-browntext"
      loading={isLoading}
    >
      {children}
    </Button>
  )
}
export interface RegisterFormData {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
}
export default function RegisterContent() {
  const [form] = Form.useForm()
  const { setUserState } = useUser?.()!
  const [api, contextHolder] = notification.useNotification()

  const router = useRouter()
  const { registerFlow, error, isPending } = useRegister()
  const onFinish = async (values: RegisterFormData) => {
    try {
      const { email, password, firstname, lastname, phone } = values
      const { response } = await registerFlow({
        email,
        password,
        name: firstname,
        role: "customer",
        surname: lastname,
        phone_number: phone,
      })
      api.success({ message: "Register success" })
      setUserState({
        user: {
          profileUrl: response.profileUrl,
          userId: response.userId,
          role: response.role,
          username: response.firstname,
        },
      })
      router.push("/registersuccess")
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
    <>
      {contextHolder}
      <Form form={form} className="mt-10 flex-col" onFinish={onFinish}>
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: "* Required Field" }]}
          className="flex-1"
        >
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[{ required: true, message: "* Required Field" }]}
          className="flex-1"
        >
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "* Required Field" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "* Required Field" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "* Required Field" }]}
        >
          <Input
            addonBefore={
              <Select defaultValue="+66">
                <Select.Option value="+1">🇺🇸 +1</Select.Option>
                <Select.Option value="+66">🇹🇭 +66</Select.Option>
                <Select.Option value="+44">🇬🇧 +44</Select.Option>
              </Select>
            }
            placeholder="Phone number"
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("* Required Field")),
            },
          ]}
        >
          <Checkbox className="text-gray-500 mt-3">
            Creating an account means you’re okay with our
            <Link href="/termsofservice" className="ml-1 mr-1 text-[#096DD9]">
              Terms of Service.
            </Link>
          </Checkbox>
        </Form.Item>
        <Form.Item className="mt-4 class">
          <SubmitButton isLoading={isPending} form={form}>
            Register
          </SubmitButton>
        </Form.Item>
      </Form>
    </>
  )
}
