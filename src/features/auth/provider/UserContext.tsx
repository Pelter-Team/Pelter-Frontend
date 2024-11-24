"use client"
import React, { useState, createContext, useContext, useEffect } from "react"
import { useMe } from "../hooks/useGetMe"
import { UserResponse } from "@/core/api/user/userContract"

const UserContext = createContext<UserContextType | null>(null)

export interface UserContextType {
  userState: UserState
  setUserState: React.Dispatch<React.SetStateAction<UserState>>
}

export function useUser(): UserContextType | null {
  const context = useContext(UserContext)
  return context
}

export type UserData = {
  userId: string
  role: "admin" | "customer" | "foundation" | "seller"
  username: string
  profileUrl: string
}

interface UserState {
  user: UserResponse | undefined
}

// example context
// const {handleImageChange, handleSubmit, handleRemoveImage, setUserState, state, handleRemoveExistBanner}:BannerContextType = useBanner?.()!;

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userState, setUserState] = useState<UserState>({
    // user: {
    //   userId:"123",
    //   email:"mix@gmail.com",
    //   firstname:"chitsanupong",
    //   lastname:"jateassavapirom",
    //   profile:"https://res.cloudinary.com/ddtwsj6v7/image/upload/v1712220177/users/bbtywoswgo60jxh3ynis.png",
    //   username:"mix",
    // }
    user: undefined,
  })
  // TODO: remove this console before commit
  console.log(userState)
  const handleGetUser = async () => {
    if (!userState.user) {
      const user = await useMe()
      if (user) {
        setUserState((prev) => ({ ...prev, user: user.response }))
      }
    }
  }
  useEffect(() => {
    handleGetUser()
  }, [userState.user])

  return (
    <UserContext.Provider
      value={{
        userState,
        setUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
