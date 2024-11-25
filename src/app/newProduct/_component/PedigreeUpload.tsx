import React, { Dispatch, SetStateAction } from "react"
import { UploadOutlined } from "@ant-design/icons"
import type { UploadProps, UploadFile } from "antd"
import { message, Button, Upload } from "antd"

export default function PetUpload({
  fileList,
  setFileList,
}: {
  fileList: UploadFile[]
  setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>
}) {
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
    maxCount: 3,
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
    <div className="flex flex-row gap-6 px-4">
      <Upload {...props} showUploadList={false}  maxCount={1} className="mt-2">
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Upload {...props} />
    </div>
  )
}
