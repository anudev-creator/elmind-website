import Image from "next/image"
import Link from "next/link"

export default function MenuBar() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-between items-center bg-white rounded-xl w-[80%] mt-5">
        <Image
          src="/Images/Home/Mainlog.png"
          alt="Main Logo"
          width={100} height={60} className="h-auto"
        />
        <div className="flex mx-4 justify-around w-[40vw] items-center">
          <Link href={"/"}>Home</Link>
          <Link href={"/underconstruction"}><div className="flex">Product
            <Image
              src="/Images/Home/DownArrow.png"
              alt="Perant image"
              width={24}
              height={24}
              className="mt-5 ml-2"
            /></div></Link>
          <Link href={"/underconstruction"}>Report</Link>
          <Link href={"/underconstruction"}>Contact</Link>
          <Link href={"/underconstruction"}><div className="bg-[#2AA5A3] shadow-[7px_5px_0px_0px_#000000] px-6 py-2 rounded-lg text-white">Book A Demo</div></Link>
        </div>
      </div>
    </div>
  )
}
