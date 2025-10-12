import Link from "next/link"
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative bottom-0 w-full mt-20 bg-black text-gray-400 py-16 px-20 ">
            {/* Footer content here */}

            <div>
                <div className="flex flex-col items-center mt-[-20]">
                    <p className="text-lg text-white">“Designed for modern schools. Ready for the world.”</p>
                    <p className="text-sm">© 2025 Elmind. All rights reserved.</p>
                </div>
                <div className="flex justify-around my-30">
                    <div className="flex justify-center items-center">
                        <Image
                            src="/Images/Home/Footer/Mainlog.png"
                            alt="Teacher image"
                            width={131}
                            height={231}
                            className="w-16"
                        />
                        <p className="text-white text-2xl font-bold">Elmind.</p>
                    </div>
                    <div className="flex justify-center gap-10">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Product</p>
                            <Link className="text-white text-md" href={"/underconstruction"}>Features</Link>
                            <Link className="text-white text-md" href={"/underconstruction"}>Pricing</Link>
                            <Link className="text-white text-md" href={"/underconstruction"}>Book a demo</Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Company</p>
                            <Link className="text-white text-md" href={"/underconstruction"}>About us</Link>
                            <Link className="text-white text-md" href={"/underconstruction"}>Contact us</Link>
                        </div>
                    </div>
                </div>


            </div>

            <div className="absolute inset-0 flex justify-center pointer-events-none">
                {/* Left line */}
                <div className="bg-[#b4b4b4] w-0.5 h-full"></div>

                {/* Spacer between the lines */}
                <div className="w-[90%] h-full"></div>

                {/* Right line */}
                <div className="bg-[#b4b4b4] w-0.5 h-full"></div>
            </div>
            {/* Vertical lines only inside the footer */}
        </footer>

    );
}