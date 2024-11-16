import Navbar from "../component/Navbar"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar white={true} />
      {children}
    </>
  )
}
