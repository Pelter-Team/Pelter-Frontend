"use client"

import Link from "next/link"
import { useState } from "react"
import { Drawer, Button, MenuProps, Dropdown, notification } from "antd"
import {
  SearchOutlined,
  MenuOutlined,
  HeartOutlined,
  UserOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  ControlOutlined,
  HomeOutlined,
  ProfileOutlined,
} from "@ant-design/icons"
import { useUser } from "@/features/auth/provider/UserContext"
import Image from "next/image"
import { useLogout } from "@/features/auth/hooks/useLogout"

export default function Navbar({ white }: { white?: boolean }) {
  const [open, setOpen] = useState(false)
  const { userState, setUserState } = useUser?.()!
  const [api, contextHolder] = notification.useNotification()
  const { logoutFlow } = useLogout()
  const menu = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/petlist" },
    { name: "Register your pet / stray", link: "/newProduct" },
  ]

  const handleLogout = async () => {
    try {
      await logoutFlow()
      api.success({ message: "Success to logout" })
      setUserState({ user: undefined })
    } catch (error) {
      api.error({ message: "Failed to logout" })
    }
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  // TODO: add the correct links
  let items: MenuProps["items"] = [
    {
      key: "home",
      label: <Link href="/">Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "register-pet",
      label: <Link href="/newProduct/">Register Pet</Link>,
      icon: <PlusCircleOutlined />,
    },
    {
      key: "manage-pet",
      label: <Link href="/productManage">Manage Pet</Link>,
      icon: <ControlOutlined />,
    },
    {
      key: "favorite",
      label: <Link href="/petlist/favorite">Favorite</Link>,
      icon: <HeartOutlined />,
    },
    {
      key: "logout",
      label: <button onClick={handleLogout}>Logout</button>,
      icon: <LogoutOutlined />,
    },
  ]

  if (userState.user?.role === "admin") {
    const logoutIndex = items.findIndex((item) => item?.key === "logout")
    items.splice(logoutIndex, 0, {
      key: "admin",
      label: <Link href="/admin">Admin</Link>,
      icon: <ProfileOutlined />,
    })
  }

  return (
    <div
      className={`z-30 flex fixed items-center justify-between px-4 md:px-8 py-2 lg:px-12 lg:py-4 h-[4.5rem] w-full ${
        white ? "text-primary" : "bg-transparent text-white"
      }`}
    >
      {contextHolder}
      <div className="flex flex-row gap-6 items-center">
        <MenuOutlined
          className="text-2xl hover:text-black cursor-pointer"
          onClick={showDrawer}
        />
        <Drawer
          onClose={onClose}
          open={open}
          placement="left"
          keyboard
          footer={
            <div className="flex flex-col gap-4 bottom-0 text-lg w-full pb-4 pt-2">
              <Link
                href="/petlist/favorite"
                className="flex items-center hover:text-primary"
              >
                <HeartOutlined className="text-3xl hover:text-black pr-2" />
                Wish list
              </Link>
              <hr />
              {userState.user ? (
                <div
                  onClick={handleLogout}
                  className="flex items-center hover:text-primary"
                >
                  <LogoutOutlined className="text-3xl hover:text-black pr-2" />
                  Signout
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center hover:text-primary"
                >
                  <UserOutlined className="text-3xl hover:text-black pr-2" />
                  Login
                </Link>
              )}
            </div>
          }
        >
          <div className="flex flex-col gap-4 text-lg">
            {menu.map((item, index) => (
              <div key={index} className="group relative items-center flex">
                <div className="group-hover:flex hidden border-4 border-primary absolute -translate-x-[1.9rem] w-3 h-3 rounded-full"></div>
                <Link className="hover:text-primary" href={item.link}>
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </Drawer>
        <Link
          href="/"
          className={`text-4xl font-bold mr-20 font-lobster ${white ? "flex" : "hidden"}`}
        >
          Pelter
        </Link>
      </div>
      <div className="flex flex-row gap-6 justify-center items-center">
        <Link href="/petlist">
          <SearchOutlined className="text-3xl hover:text-black" />
        </Link>

        {userState.user ? (
          <Dropdown menu={{ items }}>
            <Image
              src={
                userState?.user?.profileUrl ||
                "https://www.w3schools.com/howto/img_avatar.png"
              }
              onClick={(e) => e.preventDefault()}
              width={40}
              height={40}
              alt="User Image"
              className="w-10 h-10 rounded-full"
            />
          </Dropdown>
        ) : (
          <div className="flex gap-6 items-center">
            <Link href="/register">
              <Button className="flex h-full py-2 px-4 border-2 border-yellow-800 bg-yellow-800 text-white justify-center items-center rounded-md hover:bg-yellow-600">
                Sign Up
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                className={`flex h-full py-2 px-4 border-2 justify-center items-center rounded-md ${white ? "bg-secondary border-secondary hover:bg-#E9C9C1 hover:bg-opacity-80" : "border-white hover:bg-white"}`}
              >
                Log In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
