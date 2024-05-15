import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="relative h-screen">
      <div className="flex flex-col items-center justify-center h-full px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! Page not found
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Crickey!! the page you're looking for doesn't exist.
          </p>
          <Link href={`/coins`}>
            <button className="bg-amber-500 bg-opacity-30  p-2 text-xl hover:bg-purple-900 hover:bg-opacity-50 hover:border-amber-700 text-lime-100 hover:text-white py-2 px-4 border border-amber-700 hover:border-transparent rounded-lg text-shadow">
              Go back to CryptoGuru
            </button>
          </Link>
        </div>

        <div>
          <div
            style={{ padding: "30px", display: "flex", alignItems: "center" }}
          >
            <iframe
              src="https://giphy.com/embed/1lzNi9pLSJOrP0JkGQ"
              width="480"
              height="480"
              className="giphy-embed "
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
