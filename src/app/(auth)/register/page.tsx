"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Input, Button, Form, Tabs, Upload, Checkbox, Select } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import Pelter4 from "../../public/Pelter_4.png"

export default function SignUp() {
  const [isFormValid, setIsFormValid] = useState(false)
  const [form] = Form.useForm()

  const handleFormChange = () => {
    form
      .validateFields()
      .then(() => setIsFormValid(true))
      // .catch(() => setIsFormValid(false))
      console.log("is eaual", isFormValid)
  }
  const handleSubmit = (values) => {
    console.log("Form submitted with values: ", values)
    // Perform registration logic here
  }

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-[#E9C9C1] p-8">
        <h2 className="text-3xl font-semibold text-browntext font-lobster mt-7">
          Pelter
        </h2>
        <p className="text-xl mt-8 font-semibold text-pinktext">
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
            className="max-w-[500px] max-h-[500px] w-auto h-auto"
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

        <Form
          form={form}
          className="w-3/4 mt-10"
          onValuesChange={handleFormChange}
          onFinish={handleSubmit}
        >
          <Tabs
            defaultActiveKey="individual"
            centered
            tabBarStyle={{ color: "#873800" }}
            className="custom-tabs"
          >
            {/* Individual Tab */}
            <Tabs.TabPane tab="Individual" key="individual">
              <div className="flex space-x-4">
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
              </div>
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
            </Tabs.TabPane>

            {/* Foundation Tab */}
            <Tabs.TabPane tab="Foundation" key="foundation">
              <Form.Item
                name="foundationName"
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
              <Form.Item
                name="upload"
                rules={[{ required: true, message: "* Required Field" }]}
              >
                <Upload>
                  * Upload
                  <Button icon={<UploadOutlined />} className="ml-5">
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>

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
                Terms of Service
              </Link>
              ,
              <Link href="/privacypolicy" className="ml-1 text-[#096DD9]">
                Privacy Policy
              </Link>
              .
            </Checkbox>
          </Form.Item>

          <Form.Item className="mt-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-graybtn hover:bg-gray-400"
              disabled={!isFormValid}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
