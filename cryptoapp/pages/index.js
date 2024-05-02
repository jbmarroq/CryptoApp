import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to CryptoGuru</h1>
      <p>Try it now!!</p>
      <Link href={`/coins`}>Go to were the action is💰💰💰</Link>
    </div>
  );
}
