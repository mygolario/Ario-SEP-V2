import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">404 - Not Found</h2>
      <p className="text-muted-foreground">Could not find the requested resource.</p>
      <Link
        href="/"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
