"use client"
import { PropsWithChildren } from "react"
import { QueryProvider } from "./queryProvider"
import { ConfigProvider } from "antd"

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#C5705D",
        },
      }}
    >
      <QueryProvider>{children}</QueryProvider>
    </ConfigProvider>
  )
}
