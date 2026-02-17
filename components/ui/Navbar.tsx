'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isList = pathname === "/list-bookmarks";

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link href="/" className="text-xl font-semibold text-gray-800">
            Bookmark App
          </Link>
          <div>
            {isHome && (
              <Link
                href="/list-bookmarks"
                className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                List Bookmarks
              </Link>
            )}
            {isList && (
              <Link
                href="/"
                className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                Add Bookmark
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
