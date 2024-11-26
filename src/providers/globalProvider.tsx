"use client"
import { PropsWithChildren } from "react"
import { QueryProvider } from "./queryProvider"
import { ConfigProvider, notification } from "antd"
import { UserProvider } from "@/features/auth/provider/UserContext"

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification()

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#C5705D",
        },
      }}
    >
      {contextHolder}
      <QueryProvider>
        <UserProvider>{children}</UserProvider>
      </QueryProvider>
    </ConfigProvider>
  )
}
