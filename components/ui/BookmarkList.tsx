"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type Bookmark = {
    id: string;
    title: string;
    url: string;
    created_at: string;
    user_id: string;
};

export default function BookmarkList({
    initialBookmarks,
    userId,
}: {
    initialBookmarks: Bookmark[];
    userId: string;
}) {
    const [bookmarks, setBookmarks] =
        useState<Bookmark[]>(initialBookmarks);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel("bookmarks-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks",
                    filter: `user_id=eq.${userId}`,
                },
                (payload: any) => {
                    const newBookmark = payload.new as Bookmark;

                    switch (payload.eventType) {
                        case "INSERT":
                            setBookmarks((prev) => [newBookmark, ...prev]);
                            break;

                        case "DELETE":
                            setBookmarks((prev) =>
                                prev.filter((b) => b.id !== payload.old.id)
                            );
                            break;

                        case "UPDATE":
                            setBookmarks((prev) =>
                                prev.map((b) =>
                                    b.id === newBookmark.id ? newBookmark : b
                                )
                            );
                            break;
                    }
                }
            )
            .subscribe((status) => console.log("Realtime:", status));

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId]);


    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this bookmark?")) return;

        setDeletingId(id);

        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error.message);
        }

        setDeletingId(null);
    };


    if (bookmarks.length === 0) {
        return (
            <div className="text-gray-500 text-center">
                No bookmarks added yet.
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="bg-white grid grid-cols-1 gap-2 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {bookmark.title}
                        </h3>

                        <button
                            onClick={() => handleDelete(bookmark.id)}
                            disabled={deletingId === bookmark.id}
                            className=" text-white  w-20   h-8  bg-red-500   text-sm    rounded-md    transition-all     duration-300    hover:bg-red-600     hover:scale-105   active:scale-95    disabled:opacity-50     disabled:cursor-not-allowed  "
                        >
                            {deletingId === bookmark.id ? "..." : "Delete"}
                        </button>

                    </div>

                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm break-words hover:underline"
                    >
                        {bookmark.url}
                    </a>

                    <time
                        className="text-xs text-gray-400"
                        suppressHydrationWarning
                    >
                        Added{" "}
                        {new Date(bookmark.created_at).toLocaleDateString()}
                    </time>
                </div>

            ))}
        </div>
    );
}
