import { Suspense } from "react";
import BookmarkSection from "./BookmarkSelecton";
export default function ListBookmarks() {
  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-6xl">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          Your Bookmarks
        </h2>

        <Suspense fallback={<div>Loading bookmarks...</div>}>
          <BookmarkSection />
        </Suspense>
      </div>
    </div>
  );
}
