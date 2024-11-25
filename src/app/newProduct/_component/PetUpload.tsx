import React, { Dispatch, SetStateAction, useState, useEffect } from "react"
import { InboxOutlined } from "@ant-design/icons"
import type { GetProp, UploadProps, UploadFile } from "antd"
import { Image, message, Upload, Spin } from "antd"

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export default function PetUpload({
  fileList,
  setFileList,
}: {
  fileList: UploadFile[]
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>
}) {
  const [loading, setLoading] = useState(true)

  const { Dragger } = Upload

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const totalSize = fileList.reduce(
      (acc, f) => acc + (f.size || 0),
      file.size || 0
    )

    if (totalSize > 10 * 1024 * 1024) {
      message.error("Total file size exceeds 10MB. Please remove some files.")
      return false
    }
    const newFile = {
      ...file,
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    }
    setFileList([...fileList, newFile])
    return false
  }

  const handleRemove = (file: UploadFile) => {
    URL.revokeObjectURL(file.url || "")
    const newFileList = fileList.filter((f) => f.uid !== file.uid)
    setFileList(newFileList)
  }

  const props: UploadProps = {
    accept: ".jpg,.jpeg,.png",
    name: "file",
    multiple: true,
    listType: "text",
    fileList,
    beforeUpload,
    onRemove: handleRemove,
    showUploadList: {
      extra: ({ size = 0 }) => (
        <span style={{ color: "#cccccc" }}>
          &nbsp; ({(size / 1024 / 1024).toFixed(2)}MB)
        </span>
      ),
      showDownloadIcon: true,
      downloadIcon: "Download",

      showRemoveIcon: true,
    },
    onDownload: (file) => {
      if (file.url) {
        window.open(file.url, "_blank")
      }
    },
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin tip="Loading Dragger..." />
        </div>
      ) : (
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Pictures of your pet, stray pet, or found stray.
          </p>
          <p className="ant-upload-hint">Not exceeding 10MB</p>
        </Dragger>
      )}
    </>
  )
}

export function PetPreview({
  fileList,
  setFileList,
}: {
  fileList: UploadFile[]
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>
}) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
      />

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
          alt="Preview"
        />
      )}
    </>
  )
}
