"use client"
import { useState } from "react"
import { ArrowLeftOutlined } from "@ant-design/icons"
import Navbar from "../component/Navbar"
import BasicInfo from "./_component/BasicInfo"
import PetDoc from "./_component/PetDoc"
import Link from "next/link"
import { PetPreview } from "./_component/PetUpload"
import type { GetProp, UploadProps, UploadFile } from "antd"
import { message, Modal } from "antd"

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

export default function Product() {
  const [name, setName] = useState("")
  const [animal, setAnimal] = useState("")
  const [breed, setBreed] = useState("")
  const [description, setDescription] = useState("")
  const [health, setHealth] = useState("")
  const [resource, setResource] = useState("")
  const [type, setType] = useState<boolean>(false)
  const [id, setId] = useState("")
  const [cost, setCost] = useState<number>(0)
  const [uploading, setUploading] = useState(false)
  const [petList, setPetList] = useState<UploadFile[]>([])
  const [pedigree, setPedigree] = useState<UploadFile[]>([])
  const [vaccine, setVaccine] = useState("")
  const [term, setTerm] = useState<boolean>()
  const [open, setOpen] = useState(false)

  const validate =
    name !== "" &&
    description !== "" &&
    petList.length > 0 &&
    term === true &&
    animal !== "" &&
    (!type || (pedigree.length > 0 && vaccine !== "" && id !== "" && cost > 0))

  const handleUpload = () => {
    const formData = new FormData()
    petList.forEach((file) => {
      formData.append("files[]", file as FileType)
    })
    setUploading(true)
    fetch("", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setPetList([])
        message.success("upload successfully.")
      })
      .catch(() => {
        message.error("upload failed.")
      })
      .finally(() => {
        setUploading(false)
      })
  }

  return (
    <>
      <Navbar white={true} />
      <div className="min-h-screen h-fit w-screen bg-mainBG px-16">
        <div className="flex flex-row pt-24 pb-7 justify-between">
          <div className="flex flex-row gap-8 items-center">
            <Link href="/">
              <ArrowLeftOutlined className="flex justify-center text-primary  w-8 h-8 rounded-md  hover:bg-gray-100" />
            </Link>
            <div className="font-bold">
              <div className="text-xs text-gray-500">Back to all pets</div>
              <div className="text-sm">Post your animal</div>
            </div>
          </div>
          <Link
            href="/"
            className="flex justify-center items-center w-28 h-12 text-base text-white bg-primary rounded-md  hover:bg-opacity-80"
          >
            View Profile
          </Link>
        </div>

        <div className="grid gap-5 px-1 w-full grid-cols-2">
          <BasicInfo
            setName={setName}
            setAnimal={setAnimal}
            setBreed={setBreed}
            setDescription={setDescription}
            setHealth={setHealth}
            setResource={setResource}
          />

          <PetDoc
            type={type}
            petList={petList}
            setPetList={setPetList}
            setType={setType}
            setCost={setCost}
            setId={setId}
            pedigree={pedigree}
            setPedigree={setPedigree}
            setVaccine={setVaccine}
          />

          <div
            className={`w-full flex flex-col justify-end ${type == true ? "" : "col-span-2"}`}
          >
            <div className="text-xl font-bold">
              Term of Service and Conditions
            </div>
            <form className="bg-transparent w-full h-fit p-4 border border-black rounded-md mt-3 gap-3 flex flex-col items-center">
              <label htmlFor="ID" className="text-base flex flex-row mb-1">
                <span className="text-red-600">＊</span>You accept our terms of
                service and conditions.
              </label>
              <div className="flex flex-row gap-1 items-center">
                <input
                  type="radio"
                  id="TermY"
                  name="term"
                  className="accent-primary w-4 h-4"
                  onChange={(e) => setTerm(true)}
                />
                <label htmlFor="TermY">Accepted</label>
                <input
                  type="radio"
                  id="TermN"
                  name="term"
                  onChange={(e) => setTerm(false)}
                  className="ml-4 accent-primary w-4 h-4"
                />
                <label htmlFor="TermN">Rejected</label>
              </div>
            </form>
          </div>

          <div className="w-full flex justify-end col-span-2">
            <button
              className="w-24 h-10 p-4 bg-primary text-white rounded-md flex justify-center items-center hover:bg-opacity-80"
              disabled={!validate}
              onClick={() => setOpen(true)}
            >
              Confirm
            </button>
            <Modal
              title={
                <>
                  <div className="text-center text-lg">
                    Register confirmation
                  </div>
                  <div className="mt-4 border-b border-gray-200"></div>
                </>
              }
              className="flex justify-end"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={850}
              footer={[
                <div className="w-full flex flex-col" key="footer">
                  <div className="border-t border-gray-200"></div>
                  <button
                    className="w-24 h-10 p-4 bg-primary text-white rounded-md flex justify-center items-center mt-4 hover:bg-opacity-80 ml-auto"
                    disabled={validate}
                    onClick={() => setOpen(false)}
                  >
                    Confirm
                  </button>
                </div>,
              ]}
            >
              <>
                <div className="px-11 py-7 flex flex-col gap-3 text-base">
                  <div className="flex flex-row gap-8">
                    <p className="font-bold">Your Information</p>
                    <p>หมูเด้ง</p>
                    <p>012-345-6789</p>
                  </div>
                  <div className="flex flex-row gap-8">
                    <p className="font-bold">Name:</p>
                    <p>{name}</p>
                    <p className="font-bold">Type:</p>
                    <p>{animal}</p>
                    <p className="font-bold">Breed:</p>
                    <p>{breed}</p>
                  </div>
                  <div className="flex flex-row gap-8">
                    <p className="font-bold w-40">Description</p>
                    {description != "" ? (
                      <p>{description}</p>
                    ) : (
                      <p className="text-gray-400">None</p>
                    )}
                  </div>
                  <div className="flex flex-row gap-8">
                    <p className="font-bold w-40">Health Conditions:</p>
                    {health != "" ? (
                      <p>{health}</p>
                    ) : (
                      <p className="text-gray-400">None</p>
                    )}
                  </div>
                  <div className="flex flex-row gap-8">
                    <p className="font-bold w-40">Resource:</p>
                    {resource != "" ? (
                      <p>{resource}</p>
                    ) : (
                      <p className="text-gray-400">None</p>
                    )}
                    <p className="font-bold w-20">Price:</p>
                    {type && cost > 0 ? <p>{cost}</p> : <p>Free</p>}
                  </div>
                  <div className="flex flex-row gap-8">
                    <p className="font-bold">Pictures:</p>
                    <PetPreview fileList={petList} setFileList={setPetList} />
                  </div>
                </div>
              </>
            </Modal>
          </div>

          {!validate && (
            <div className="w-full flex justify-center col-span-2 text-red-500 mb-4">
              Please Input all require information
            </div>
          )}
        </div>
      </div>
    </>
  )
}
