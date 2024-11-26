import { useUser } from "@/features/auth/provider/UserContext"
import { Image } from "antd"

export default function UserProfile() {
  const { userState } = useUser?.()!

  return (
    <>
      <div className="flex w-1/4 p-8 flex-col">
        <Image
          className="w-full aspect-square rounded-3xl"
          src={
            userState.user?.profileUrl ||
            "https://www.w3schools.com/howto/img_avatar.png"
          }
        />
        <div className="mt-6 flex flex-col gap-4">
          <div className="text-4xl font-bold">{userState.user?.username}</div>
          {/* <div className="text-sm line-clamp-6">
            Hello,I am a cat lover, please contact me via phone call. I mostly
            post the cat that live in Silom area. Most of them are adorable
            please open your heart for street cat.
          </div> */}
        </div>
      </div>
    </>
  )
}
