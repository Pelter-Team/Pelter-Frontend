"use client"
import { useState } from "react"
import { StarOutlined, ArrowLeftOutlined, LikeFilled } from "@ant-design/icons"
import Navbar from "../component/Navbar"
import Link from "next/link"
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
    accept: ".jpg,.jpeg,.png",
    name: 'file',
    multiple: true,
    action: 'http://localhost:3000/',
    listType: 'picture',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: {
        extra: ({ size = 0 }) => (
            <span style={{ color: '#cccccc' }}>({(size / 1024 / 1024).toFixed(2)}MB)</span>
        ),
        showDownloadIcon: true,
        downloadIcon: 'Download',
        showRemoveIcon: true,
    },
};

export default function Product() {
    const [name, setName] = useState("");
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const [description, setDescription] = useState("")
    const [health, setHealth] = useState("")
    const [resource, setResource] = useState("")
    const [type, setType] = useState("")
    const [id, setId] = useState("")

    return (
        <>
            <Navbar />
            <div className="min-h-screen h-fit w-screen bg-mainBG px-16 ">
                <div className="flex flex-row pt-24 pb-7 justify-between">
                    <div className="flex flex-row gap-8 items-center">
                        <Link href="/"><ArrowLeftOutlined className="flex justify-center text-primary bg-white w-8 h-8 rounded-md shadow-md hover:bg-gray-100" /></Link>
                        <div className="font-bold">
                            <div className="text-xs text-gray-500">Back to all pets</div>
                            <div className="text-sm">Post your animal</div>
                        </div>
                    </div>
                    <Link href="/" className="flex justify-center items-center w-28 h-12 text-base text-white bg-primary rounded-md shadow-md hover:bg-opacity-80">
                        View Profile
                    </Link>
                </div>

                <div className="flex gap-5 px-1 w-full">
                    <div className="w-1/2 flex flex-col">
                        <div className="text-xl font-bold drop-shadow-2xl [text-shadow:_0_5px_10px_rgb(0_0_0_/_40%)]">Basic Information</div>
                        <form className="bg-transparent w-full h-fit p-4 border border-black rounded-md mt-3 gap-2 flex flex-col">
                            <div>
                                <label htmlFor="Name" className="text-base flex flex-row mb-1"><span className="text-red-600">＊</span>Name</label>
                                <input
                                    type="text"
                                    id="Name"
                                    className="shadow-md w-full h-10 text-sm rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                    placeholder="AiDum, etc."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <div className="flex flex-row mt-1 items-center gap-1">
                                    <input type="radio" id="cat" name="animal" value="Cat" onChange={(e) => setAnimal(e.target.value)} />
                                    <label htmlFor="cat">Cat</label>
                                    <input type="radio" id="dog" name="animal" value="Dog" onChange={(e) => setAnimal(e.target.value)} className="ml-2" />
                                    <label htmlFor="dog">Dog</label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="Breed" className="text-base flex flex-row gap-1 mb-1">Breed<span className="text-gray-500">(optional)</span></label>
                                <input
                                    type="text"
                                    id="Breed"
                                    className="shadow-md w-full h-10 text-sm rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                    placeholder="Mixed, Mutt, Moggie, etc."
                                    value={breed}
                                    onChange={(e) => setBreed(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="Description" className="text-base flex flex-row mb-1"><span className="text-red-600">＊</span>Description</label>
                                <textarea
                                    id="Description"
                                    className="resize-y shadow-md p-2 w-full h-10 text-sm rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                    placeholder="Big ears, etc."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="Health" className="text-base flex flex-row gap-1 mb-1">Health Conditions<span className="text-gray-500">(optional)</span></label>
                                <input
                                    type="text"
                                    id="Health"
                                    className="shadow-md w-full h-10 text-sm rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                    placeholder="Allergies, Coughing, Diarrhea, etc."
                                    value={health}
                                    onChange={(e) => setHealth(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="Resource" className="text-base flex flex-row gap-1 mb-1">Resource<span className="text-gray-500">(optional)</span></label>
                                <input
                                    type="text"
                                    id="Resource"
                                    className="shadow-md w-full h-10 text-sm rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                    placeholder="Bangkok, etc."
                                    value={resource}
                                    onChange={(e) => setResource(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="w-1/2 flex-col">
                        <div className="text-xl font-bold drop-shadow-2xl [text-shadow:_0_5px_10px_rgb(0_0_0_/_40%)]">Pet images and documents</div>
                        <div className="bg-transparent w-full h-fit py-8 px-16 border border-black rounded-md mt-3 flex flex-col mb-1 gap-2">
                            <div>
                                <label className="text-base flex flex-row mb-1"><span className="text-red-600">＊</span>Pet images</label>
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Pictures of your pet, stray pet or founded stray.
                                    </p>
                                    <p className="ant-upload-hint">
                                        Not exceeding 10MB
                                    </p>
                                </Dragger>
                            </div>
                            <div className="text-sm mt-8 flex justify-center w-full">
                                Do you prefer to sell it for <span className="font-bold">&nbsp;free&nbsp;</span> or with <span className="font-bold">&nbsp;adoption cost</span>?
                            </div>

                            <form className="flex flex-row gap-1 w-full justify-center">
                                <input type="radio" id="free" name="Type" value="Free" onChange={(e) => setType(e.target.value)} />
                                <label htmlFor="free">Free</label>
                                <input type="radio" id="cost" name="Type" value="Cost" onChange={(e) => setType(e.target.value)} className="ml-2" />
                                <label htmlFor="cost">Adoption cost added</label>
                            </form>

                            <div className="flex flex-row justify-center items-center gap-2">
                                <LikeFilled className="text-3xl" />
                                Thank you for contributing for stray cat (dog)
                            </div>

                            <div className={`${type == "Cost" ? "flex flex-col" : "hidden"} gap-2`}>
                                <div className="w-full flex flex-row justify-center items-center">
                                    Cost:
                                    <input type="number" className="w-20 h-8 rounded-l-md shadow-md ml-2 border-l border-t border-b" />
                                    <div className="rounded-r-md bg-gray-200 w-6 h-8 flex justify-center items-center shadow-md border-r border-t border-b">฿</div>
                                </div>

                                <div>
                                    <label htmlFor="Name" className="text-base flex flex-row mb-1"><span className="text-red-600">＊</span>Pet ID</label>
                                    <input
                                        type="text"
                                        id="ID"
                                        className="shadow-md w-full h-10 text-sm rounded-lg bg-white border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 px-2"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Name" className="text-base flex flex-row mb-1"><span className="text-red-600">＊</span>Pedigree Certification</label>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}