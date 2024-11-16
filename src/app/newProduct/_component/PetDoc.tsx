"use client"
import { LikeFilled } from "@ant-design/icons"
import PetUpload from "./PetUpload"
import PedigreeUpload from "./PedigreeUpload"
import type { UploadFile } from "antd"

interface PetDocProps {
  type: boolean
  petList: UploadFile[]
  setPetList: React.Dispatch<React.SetStateAction<UploadFile[]>>
  setType: React.Dispatch<React.SetStateAction<boolean>>
  setCost: React.Dispatch<React.SetStateAction<number>>
  setId: React.Dispatch<React.SetStateAction<string>>
  pedigree: UploadFile[]
  setPedigree: React.Dispatch<React.SetStateAction<UploadFile[]>>
  setVaccine: React.Dispatch<React.SetStateAction<string>>
}

export default function PetDoc({
  type,
  petList,
  setPetList,
  setType,
  setCost,
  setId,
  pedigree,
  setPedigree,
  setVaccine,
}: PetDocProps) {
  return (
    <>
      <div className={`w-full flex-col ${type == true ? "row-span-2" : ""}`}>
        <div className="text-xl font-bold  ">Pet images and documents</div>
        <div className="bg-transparent w-full py-8 px-16 border border-black rounded-md mt-3 flex flex-col gap-3 min-h-[27rem]">
          <div>
            <label className="text-base flex flex-row mb-1">
              <span className="text-red-600">＊</span>Pet images
            </label>
            <PetUpload fileList={petList} setFileList={setPetList} />
          </div>
          <div className="mt-8 flex justify-center w-full">
            Do you prefer to sell it for
            <span className="font-bold">&nbsp;free&nbsp;</span> or with{" "}
            <span className="font-bold">&nbsp;adoption cost</span>?
          </div>

          <form className="flex flex-row gap-1 w-full justify-center items-center">
            <input
              type="radio"
              id="free"
              name="Type"
              className="accent-primary w-4 h-4"
              onChange={() => setType(false)}
            />
            <label htmlFor="free">Free</label>
            <input
              type="radio"
              id="cost"
              name="Type"
              onChange={() => setType(true)}
              className="ml-2 accent-primary w-4 h-4"
            />
            <label htmlFor="cost">Adoption cost added</label>
          </form>

          <div className="flex flex-row justify-center items-center gap-2">
            Thank you for contributing for stray cat (dog)
            <LikeFilled className="text-xl text-primary" />
          </div>

          <div className={`${type == true ? "flex flex-col" : "hidden"} gap-2`}>
            <div className="w-full flex flex-row justify-center items-center">
              <span className="text-red-600">＊</span>
              Cost:
              <input
                type="number"
                onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                className="w-20 h-8 rounded-l-md  ml-2 border-l border-t border-b bg-mainBG flex p-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0"
              />
              <div className="rounded-r-md bg-gray-200 w-6 h-8 flex justify-center items-center  border-r border-t border-b">
                ฿
              </div>
            </div>

            <div>
              <label htmlFor="ID" className="text-base flex flex-row mb-1">
                <span className="text-red-600">＊</span>Pet ID
              </label>
              <input
                type="text"
                id="ID"
                placeholder="TH-123456789"
                className=" w-full h-10 text-sm rounded-lg  border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2 bg-mainBG"
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="Ped" className="text-base flex flex-row mb-1">
                <span className="text-red-600">＊</span>Pedigree Certification
              </label>
              <PedigreeUpload fileList={pedigree} setFileList={setPedigree} />
            </div>

            <label htmlFor="ID" className="text-base flex flex-row mb-1">
              <span className="text-red-600">＊</span>Already Vaccinated
            </label>
            <form className="flex flex-row gap-1 items-center">
              <input
                type="radio"
                id="Yes"
                name="Vaccine"
                value="Yes"
                className="accent-primary w-4 h-4"
                onChange={(e) => setVaccine(e.target.value)}
              />
              <label htmlFor="Yes">Yes</label>
              <input
                type="radio"
                id="No"
                name="Vaccine"
                value="No"
                onChange={(e) => setVaccine(e.target.value)}
                className="ml-4 accent-primary w-4 h-4"
              />
              <label htmlFor="No">No</label>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
