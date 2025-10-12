import Image from "next/image"

export default function Body() {
    return (
        <div className="mt-8 w-[85%]">
            <div className="bg-white w-full h-[75vh] rounded-xl flex justify-center">
                <div className="flex flex-col justify-center items-center">
                    <div className="font-bold text-2xl animate-fade-in-up">Elmind.</div>
                    <div></div>
                    {/* Animation: Added a staggered fade-in effect to the main hero text */}
                    <div className="text-6xl font-semibold animate-fade-in-up" style={{ animationDelay: '100ms' }}>The AI Engine powering</div>
                    <div className="text-6xl font-semibold text-[#2AA5A3] animate-fade-in-up" style={{ WebkitTextStroke: "1px black", animationDelay: '200ms' }}>
                        Smarter schools.
                    </div>
                    <p className="w-150 text-center mt-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>Elmind captures every student interaction and transforms it into actionable insights for teachers and parents — helping them understand what&apos;s wrong, why it&apos;s happening, and how to fix it, instantly with the power of AI.</p>
                </div>
            </div>
            <div className="flex justify-center pt-8">
                <p className="w-[50%] text-center text-xl">Whether you&apos;re a teacher guiding a classroom or a parent supporting from home — Elmind brings clarity, insight, and action to every student&apos;s journey.</p>
            </div>
            <div className="flex justify-center pt-8">
                {/* Animation: Added a hover effect to the button */}
                <button className="bg-[#2AA5A3] shadow-[5px_4px_0px_0px_#000000] p-3 rounded-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[7px_6px_0px_0px_#000000]">
                    <p className="text-white">See Elmind in Action</p>
                </button>
            </div>
            <div>
                <div className="bg-white mt-8 w-full h-full rounded-xl flex flex-col justify-top items-center p-5">
                    <h2 className="font-bold text-6xl"><span className="text-[#2AA5A3]">One</span> Platform. <span className="text-[#2AA5A3]">Three</span> Perspectives.</h2>
                    <p className="w-[80%] text-2xl text-center">Whether you&apos;re a parent, teacher, or principal — Elmind delivers tailored,
                        real-time insights built for your perspective.</p>

                    {/* Animation: Added a staggered fade-in and hover effect to the cards */}
                    <div className="flex w-[90%] justify-between gap-10 p-4 mt-4">
                        <div className="flex-1 border-1 shadow-[5px_4px_0px_0px_#000000] border-black rounded-2xl transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up">
                            <div className="w-full border-b-1 flex flex-row">
                                <div className=" h-full w-1/3 flex items-center justify-center">
                                    <Image
                                        src="/Images/Home/Body/Box_01.png"
                                        alt="Number one"
                                        width={57}
                                        height={56}
                                        className="mt-5 ml-2"
                                    />
                                </div>
                                <div className=" h-full w-full">
                                    <Image
                                        src="/Images/Home/Body/Box_01perants.png"
                                        alt="Parent image"
                                        width={241}
                                        height={157}
                                        className="mt-5"
                                    /></div>
                            </div>
                            <div className="pl-4 pr-1">
                                <h2 className="font-bold text-xl my-2">For Parents</h2>
                                <p className="text-md">
                                    An AI that understands your child. Get personalised insights into your child&apos;s learning journey — powered by Elmind&apos;s intelligent analysis of marks, answer sheets, and classroom activity. - AI-detected weak topics - Progress reports that make sense - Alerts on patterns before they become problems.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 border-1 shadow-[5px_4px_0px_0px_#000000] border-black rounded-2xl transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="w-full border-b-1 flex flex-row">
                                <div className=" h-full w-1/3 flex items-center justify-center"> <Image
                                    src="/Images/Home/Body/Box_02.png"
                                    alt="Number two"
                                    width={57}
                                    height={56}
                                    className="mt-5 ml-2"
                                /></div>
                                <div className=" h-full w-full">
                                    <Image
                                        src="/Images/Home/Body/Box_02teacher.png"
                                        alt="Teacher image"
                                        width={241}
                                        height={157}
                                        className="mt-5"
                                    />
                                </div>
                            </div>
                            <div className="pl-4 pr-1">
                                <h2 className="font-bold text-xl my-2">For Teachers</h2>
                                <p className="text-md">
                                    Your personal AI teaching assistant. Elmind turns raw data into instant, actionable insights — helping you focus less on manual tracking and more on impactful teaching.  - AI-pinpointed learning gaps  - Class performance heatmaps  - Smart suggestions for re-teaching or revision.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 border-1 shadow-[5px_4px_0px_0px_#000000] border-black rounded-2xl transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                            <div className="w-full border-b-1 flex flex-row">
                                <div className=" h-full w-1/3 flex items-center justify-center">
                                    <Image
                                        src="/Images/Home/Body/Box_03.png"
                                        alt="Number three"
                                        width={57}
                                        height={56}
                                        className="mt-5 ml-2"
                                    /></div>
                                <div className=" h-full w-full">
                                    <Image
                                        src="/Images/Home/Body/Box_03Admins.png"
                                        alt="Admin image"
                                        width={241}
                                        height={157}
                                        className="mt-5"
                                    />
                                </div>
                            </div>
                            <div className="pl-4 pr-1">
                                <h2 className="font-bold text-xl my-2">For Admins</h2>
                                <p className="text-md">
                                    AI-driven visibility across your school. From attendance to academic health, Elmind&apos;s intelligent dashboards give you the full picture — with alerts, trends, and forecasts. - Predict student drop-offs  - Track overall school health   -AI-generated reports that save hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center h-36">
                <button className="bg-[#2AA5A3] p-3 text-white text-sm shadow-[3px_2px_0px_0px_#000000] rounded-xl transition-transform duration-300 hover:-translate-y-1">
                    DROP YOUR NUMBER
                </button>
            </div>
            <div className=" bg-[#232426] flex flex-col items-center rounded-3xl py-8">
                <div className=" p-4">
                    <h1 className="text-4xl font-bold uppercase tracking-wider text-white md:text-6xl lg:text-7xl">
                        <span className="[text-shadow:0_0_10px_#00d5ff]">
                            See how it{' '}
                        </span>
                        <span className="text-transparent [-webkit-text-stroke:2px_#00d5ff]">
                            works?
                        </span>
                    </h1>
                </div>
                <p className="text-[#F0F0F0] text-xl mt-2">Watch how we turn student data into powerful, easy-to-use insights — for both teachers and parents.</p>
                <button className="border-1 border-[#2AA5A3] flex gap-3 p-3 rounded-2xl mt-8 transition-transform duration-300 hover:scale-105">
                    <Image
                        src="/Images/Home/Body/playbtn.png"
                        alt="Play button"
                        width={25}
                        height={25}
                    />
                    <p className="text-white">How it works</p>
                </button>
                <div className=" w-[60%] bg-white  mt-10 rounded-2xl">
                    <video
                        className="w-full h-full object-cover rounded-2xl"
                        src="/Images/Home/Body/Working.mp4"
                        controls
                    />
                </div>
                <p className="text-white mt-4 ">This is not just a demo. This is the future of education.</p>
            </div>
            <div className="flex justify-center py-16">
                <p className="text-6xl">Book a time that fits your schedule.</p>
            </div>
            <div className="flex justify-center p-5 gap-6 ">
                <div className="flex items-center p-0 m-0 w-md h-20 border-3  rounded-2xl overflow-hidden">
                    <div className="w-5/8 bg-[#2AA5A3] h-full flex  justify-center items-center text-xl text-white">try elmind</div>
                    <div className="bg-white flex items-center h-full w-full">
                        <input type="number" name="" placeholder="Phone number" className="pl-5 w-full" />
                    </div>
                </div>
                {/* Animation: Note that the <img> tag was not converted to <Image /> in your provided code, so I've left it but added animation */}
                <div className="flex justify-evenly items-center bg-white w-[25%] rounded-2xl border-3 transition-transform duration-300 hover:scale-105"><p>GET A CALL</p><Image
                    src="/Images/Home/DownArrow.png"
                    alt="Perant image"
                    width={24}
                    height={24}
                    className="mt-5 ml-2"
                /></div>
            </div>
        </div>
    )
}