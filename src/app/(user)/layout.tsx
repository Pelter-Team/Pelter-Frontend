import Navbar from "../component/Navbar"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FFFAF5] h-full min-h-screen">
      <Navbar white={true} />
      {children}
    </div>
  )
}
