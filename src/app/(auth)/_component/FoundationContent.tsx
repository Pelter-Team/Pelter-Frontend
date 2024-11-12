import { Input, Button, Form, Tabs, Upload, Checkbox, Select, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
import type { FormInstance, UploadFile, UploadProps  } from "antd";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

interface SubmitButtonProps {
  form: FormInstance;
}
export const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({form,children,}) => {
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [values, form]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      className="w-full text-white bg-browntext"
    >
      {children}
    </Button>
  );
};

export default function FoundationContent(){

  const [form] = Form.useForm();
  const router = useRouter(); //navigate to success
  const [fileList, setFileList] = useState([]); //store file that user upload
  //@ts-ignore
  const handleFileChange = ({ fileList }: {fileList:any}) => {
    setFileList(fileList); // Update fileList state
  }; 

  return (
    <> 
      <Form
        form={form}
        className="w-3/4 mt-10 flex-col"
        onFinish={(values) => {
            console.log("Form submitted:", values);
            router.push("/registersuccess");
          }}  
      >
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
              <Divider>
                Verify your foundation
              </Divider>
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
                  <Button icon={<UploadOutlined />} className="ml-5">
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
            <SubmitButton form={form} >Register</SubmitButton>
          </Form.Item>
        </Form>
    </>
    )
}