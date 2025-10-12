import Footer from "@/Components/Footer";
import MenuBar from "../Components/MenuBar";
import Body from "@/Components/Body";

export default function Home() {
  return (
    <div className="no-scrollbar h-screen flex flex-col relative items-center">
      <MenuBar />
      <Body />
      <Footer/>
      <div className="fixed flex pointer-events-none justify-center w-full h-screen">
        <div className="bg-[#00000056] w-0.5 h-full"></div>
        <div className="w-[90%] h-6">
        </div>
        <div className="bg-[#00000056] w-0.5 h-full"></div>
      </div>
    </div>
  );
}