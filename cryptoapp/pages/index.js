import Link from "next/link";
import Image from "next/image";
import GuruPic from "../public/CryptoGuru.png";

export default function Home() {
  const imageWidth = 1920;
  const imageHeight = 1080;
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div
          className="max-w-[1920px] max-h-[1080px]   overflow-hidden "
          style={{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
          }}
        >
          <Image
            src={GuruPic}
            alt="Picture of the CryptoGuru"
            priority
            sizes="100vw"
            quality={100}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            className="md:object-fill "
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
        <div className="container text-center">
          <h1 className="scroll-m-20 pb-2 text-lime-100 text-3xl font-semibold tracking-tight first:mt-0 text-shadow">
            Welcome to CryptoGuru
          </h1>
          <style jsx>{`
            .text-shadow {
              text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
                -1px 1px 0 #000;
            }
          `}</style>
          <p className="description mb-6 text-white text-shadow">
            Your guide to cryptocurrency investment
          </p>
          <Link href={`/coins`}>
            <button className="bg-amber-500 bg-opacity-30  p-2 text-xl hover:bg-purple-900 hover:bg-opacity-50 hover:border-amber-700 text-lime-100 hover:text-white py-2 px-4 border border-amber-700 hover:border-transparent rounded-lg text-shadow">
              Get in on the action!!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
