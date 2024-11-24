import {
  Input,
  Button,
  Form,
  Upload,
  Checkbox,
  Select,
  Divider,
  UploadFile,
  notification,
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import Link from "next/link"
import type { FormInstance } from "antd"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRegister } from "@/features/auth/hooks/useRegister"
import { RegisterFormData } from "./RegisterContent"
import { useUser } from "@/features/auth/provider/UserContext"
import cloudinary from "@/core/cloudinary"

interface SubmitButtonProps {
  form: FormInstance
  isLoading?: boolean
}
export const SubmitButton: React.FC<
  React.PropsWithChildren<SubmitButtonProps>
> = ({ form, children, isLoading }) => {
  const [submittable, setSubmittable] = useState(false)
  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [values, form])

  return (
    <Button
      loading={isLoading}
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      className="w-full text-white bg-browntext"
    >
      {children}
    </Button>
  )
}
interface RegisterFoundation extends RegisterFormData {
  address: string
}
export default function FoundationContent() {
  const { setUserState } = useUser?.()!
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification()
  const { registerFlow, error, isPending } = useRegister()

  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>() //store file that user upload

  //@ts-ignore
  const handleFileChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList) // Update fileList state
  }

  const onFinish = async (values: RegisterFoundation) => {
    try {
      const { email, password, firstname, phone, address } = values

      if (!fileList || fileList.length === 0) {
        throw Error("Please upload your foundation document")
      }

      const [file] = fileList
      if (!file.originFileObj) {
        throw Error("Invalid file object")
      }
      const uploadResponse = await cloudinary.uploadToCloudinary(
        file.originFileObj
      )
      const documentUrl = uploadResponse.secure_url

      const { response } = await registerFlow({
        email,
        password,
        name: firstname,
        role: "foundation",
        surname: "foundation",
        phone_number: phone,
        address: address,
        profile_url: documentUrl,
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
        >
          <Input placeholder="Foundation name" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "* Required Field" }]}
        >
          <Input placeholder="Foundation address" />
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
        <Divider>Verify your foundation</Divider>
        <Form.Item
          name="upload"
          label={<span className="text-red-500">Upload</span>}
          rules={[{ required: true, message: "* Required Field" }]}
          extra="e.g., Foundation document, card"
        >
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />} className="ml-5 mt-5">
              Click to Upload
            </Button>
          </Upload>
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
