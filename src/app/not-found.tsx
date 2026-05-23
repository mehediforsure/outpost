import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Story not found</h1>
      <p>The article may have moved, or it has not been published yet.</p>
      <Link className="primary-button" href="/">
        Back to front page
      </Link>
    </main>
  );
}
