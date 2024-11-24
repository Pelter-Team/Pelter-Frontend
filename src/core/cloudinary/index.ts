import { UploadResponse } from "./cloudinary"

class Cloudinary {
  private uploadPreset: string
  private cloudName: string

  constructor(uploadPreset: string | undefined, cloudName: string | undefined) {
    if (!uploadPreset) {
      throw new Error(
        "NEXT_PUBLIC_PRESET is not defined in environment variables"
      )
    }
    if (!cloudName) {
      throw new Error(
        "NEXT_PUBLIC_CLOUD_NAME is not defined in environment variables"
      )
    }
    this.uploadPreset = uploadPreset
    this.cloudName = cloudName
  }

  private generateUniqueUploadId = (subfix: string): string => {
    const timestamp = new Date().getTime().toString()
    const randomLetters = Array(5)
      .fill(null)
      .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
      .join("")
    return `${timestamp}${randomLetters}${subfix}`
  }

  public uploadToCloudinary = async (file: File): Promise<UploadResponse> => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", this.uploadPreset)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            "X-Unique-Upload-Id": this.generateUniqueUploadId(file.name),
          },
        }
      )

      const data: UploadResponse | undefined = await response.json()
      if (!response.ok || !data) {
        throw new Error("Failed to upload image")
      }

      return data
    } catch (error) {
      let reason = error instanceof Error ? error.message : error
      throw new Error(`Failed to upload image: ${reason}`)
    }
  }
}

let cloudinary: Cloudinary
try {
  cloudinary = new Cloudinary(
    process.env.NEXT_PUBLIC_PRESET,
    process.env.NEXT_PUBLIC_CLOUD_NAME
  )
} catch (error) {
  console.error("Cloudinary initialization failed:", error)
  throw error
}

export default cloudinary
