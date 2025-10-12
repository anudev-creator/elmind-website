import Link from "next/link";


export default function UnderConstruction() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center p-4">
            <div className="text-center">

                {/* Brand Name */}
                <div className="font-bold text-2xl text-gray-700 mb-8">Elmind.</div>

                {/* Animated Gear Icon */}
                <div className="flex justify-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#434343"><path d="M764-120 523.67-360.33l66-66L830-186l-66 66Zm-571.33 0-66-66L412-471.33l-94-94-24.67 24.66L247-587v84l-25.33 25.33L100-599.33l25.33-25.34H210l-48.67-48.66L296-808q18-18 39-25t45-7q24 0 45 8.67 21 8.66 39 26.66l-102 102L410.67-654l-25.34 25.33 92 92L588.67-648q-6.67-12.33-10.5-27.67-3.84-15.33-3.84-32 0-55 39.17-94.16Q652.67-841 707.67-841q15 0 26.5 3t20.83 8.33L665.33-740l74 74L829-755.67q5.67 10 8.83 22.17 3.17 12.17 3.17 27.17 0 55-39.17 94.16Q762.67-573 707.67-573q-16 0-28.67-2.33-12.67-2.34-23.67-7.34L192.67-120Z" /></svg>
                </div>

                {/* Main Heading with your brand's style */}
                <h1 className="text-5xl md:text-7xl font-bold text-[#2AA5A3] mb-4" style={{ WebkitTextStroke: "2px black" }}>
                    Coming Soon
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    We&apos;re currently working on creating something amazing. This page is under construction, but we&apos;ll be here shortly. Thanks for your patience!
                </p>

                {/* Button styled like your reference */}
                <div className="mt-12">
                    <Link
                        href="/"
                        className="bg-[#2AA5A3] shadow-[5px_4px_0px_0px_#000000] p-3 px-6 rounded-xl inline-block transition-transform hover:scale-105"
                    >
                        <p className="text-white font-semibold text-lg">Go Back Home</p>
                    </Link>
                </div>

            </div>
        </div>
    );
}