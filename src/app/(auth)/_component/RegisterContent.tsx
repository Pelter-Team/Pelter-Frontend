import { Input, Button, Form, Tabs, Upload, Checkbox, Select, Divider } from "antd";
import {useState, useEffect} from "react"
import type { FormInstance } from "antd";
import Link from "next/link";
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

export default function RegisterContent(){
  
  const [form] = Form.useForm();
  const router = useRouter(); //navigate to success

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
                <SubmitButton form={form} >Register</SubmitButton>
              </Form.Item>
          </Form>
      </>
    )
}
