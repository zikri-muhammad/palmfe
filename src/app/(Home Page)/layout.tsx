import Image from "next/image";
import bg from "@/assets/image/bg.png";
import hero from "@/assets/image/hero.jpeg";
import logo from "@/assets/icon/logo.svg";

export default function HomeLayout({ children }: {
    children: React.ReactNode
}) {

    return (
        <main
            className="min-h-screen w-full overflow-y-scroll"
            style={{
                backgroundImage: `url(${bg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
            role="main">
            <div className="container mx-auto mb-14">
                <div className="flex justify-center mt-8">
                    <Image alt="logo" src={logo} />
                </div>
                <div className="flex justify-center mt-14">
                    <div className="flex">
                        <div className="w-80">
                            <Image alt="hero" className="w-full h-full object-cover object-center" src={hero} />
                        </div>
                        <div className="bg-dark w-[702px] text-white p-14">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}