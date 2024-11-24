"use client"
import { PropsWithChildren } from "react"
import { QueryProvider } from "./queryProvider"
import { ConfigProvider } from "antd"
import { UserProvider } from "@/features/auth/provider/UserContext"

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#C5705D",
        },
      }}
    >
      <QueryProvider>
        <UserProvider>{children}</UserProvider>
      </QueryProvider>
    </ConfigProvider>
  )
}
