import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Film Library</h1>
      <p>Explore our collection of movies.</p>
      <Link href={`/coins`}>Go to Coins Library</Link>
    </div>
  );
}
