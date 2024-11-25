import { Image } from "antd"

export default function UserProfile() {
  return (
    <>
      <div className="flex w-1/4 p-8 flex-col">
        <Image
          className="w-full aspect-square rounded-3xl"
          src="https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg"
        />
        <div className="mt-6 flex flex-col gap-4">
          <div className="text-4xl font-bold">Panyawut P</div>
          <div className="text-sm line-clamp-6">
            Hello,I am a cat lover, please contact me via phone call. I mostly
            post the cat that live in Silom area. Most of them are adorable
            please open your heart for street cat.
          </div>
        </div>
      </div>
    </>
  )
}
