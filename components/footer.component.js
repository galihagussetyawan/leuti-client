import Image from "next/image";
import Collapse from "./collapse.component";

export default function Footer() {
    return (
        <footer className=" md:w-full md:my-24 md:cursor-pointer">
            <div className="md:px-10 md:grid md:grid-cols-4 gap-5">

                {/* column one */}
                <div className="md:flex md:flex-row md:gap-28">
                    <div>
                        <h6 className=" font-semibold">BRAND</h6>
                        <Image
                            width={102}
                            height={60}
                            src={'/wordmark-logo.png'} />
                    </div>

                    <div>
                        <h6 className=" font-semibold">BPOM</h6>
                        <Image
                            width={102}
                            height={60}
                            src={'/BPOM-Logo.jpg'} />
                    </div>
                </div>
                {/* end column one */}

                {/* column two */}
                <div className="md:flex md:flex-col md:gap-10">
                    <h6 className=" font-semibold">CLIENT SERVICES</h6>
                    <div className=" md:flex md:flex-col md:gap-5">

                        <Collapse title="Contact">
                            <span>INSTAGRAM</span>
                            <span>INSTAGRAM</span>
                        </Collapse>

                        <Collapse title={'FAQ'}>
                            <span>Test1</span>
                            <span>Test2</span>
                        </Collapse>
                    </div>
                </div>
                {/* end column two */}

                {/* column three */}
                <div className="md:flex md:flex-col md:gap-10">
                    <h6 className=" font-semibold">THE STORY OF LEUTI</h6>

                    <div className=" md:flex md:flex-col md:gap-5">

                        <Collapse title="Legal Terms">
                            <span>Legal 1</span>
                            <span>Legal 2</span>
                            <span>Legal 3</span>
                        </Collapse>
                        <Collapse title="Follow Us">
                            <span>Instagram</span>
                            <span>Tiktok</span>
                            <span>Youtube</span>
                        </Collapse>
                        <span>Careers</span>
                        <Collapse title="News">
                            <span>Kompas</span>
                        </Collapse>
                    </div>
                </div>
                {/* end column three */}

                {/* column four */}
                <div className="">
                    <div>
                        <h6 className=" font-semibold">COUNTRY / REGION</h6>
                    </div>
                </div>
                {/* end column four */}
            </div>
        </footer>
    );
}