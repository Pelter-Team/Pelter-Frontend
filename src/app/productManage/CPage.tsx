"use client"
import PetList from "../../features/productManage/_component/PetList"
import UserProfile from "../../features/productManage/_component/UserProfile"
import { Card,CardsProvider } from "../../features/productManage/provider/PetProvider"

export default function Manage() {

  const cards: Card[] = [
    {
      name: "N'Chacha",
      type: "Cat",
      description: "A dumdass cat who like to eat luxury food every meal. Sleep all day all-night don't do any thing except snoring",
      isAdopt: true,
      updatedAt: "Diao Kon"
    },
    {
      name: "N'Wut",
      type: "Cat",
      description: "A dumdass cat who like to eat luxury food every meal. Sleep all day all-night don't do any thing except snoring",
      isAdopt: false,
      updatedAt: "Diao Kon"
    },
    {
      name: "N'Tee",
      type: "Dog",
      description: "A dumdass cat who like to eat luxury food every meal. Sleep all day all-night don't do any thing except snoring",
      isAdopt: false,
      updatedAt: "Diao Kon"
    }
  ]

  return (
    <>
    <CardsProvider cards={cards}>
      <div className="min-h-screen h-fit w-screen bg-mainBG px-16 flex">
        <div className="flex flex-row pt-20 pb-7 justify-between w-full gap-10">
          <UserProfile />
          <PetList />
        </div>
      </div>
      </CardsProvider>
    </>
  )
}
