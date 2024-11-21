"use client"
import PetList from "../../features/productManage/_component/PetList"
import UserProfile from "../../features/productManage/_component/UserProfile"

export default function Manage() {
  return (
    <>
      <div className="min-h-screen h-screen w-screen bg-mainBG px-16 flex overflow-y-hidden">
        <div className="flex flex-row pt-20 pb-7 justify-between w-full gap-10 h-full">
          <UserProfile />
          <PetList />
        </div>
      </div>
    </>
  )
}
