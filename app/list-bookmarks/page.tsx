import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BookmarkList from "@/components/ui/BookmarkList";
import { Suspense } from "react";

export default async function ListBookmarks() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: bookmarks, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        return <div>Error loading bookmarks</div>;
    }

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">
                    Your Bookmarks
                </h2>
                <Suspense fallback={<div className="text-center">Loading...</div>}>
                    <BookmarkList
                        initialBookmarks={bookmarks}
                        userId={user.id}
                    />
                </Suspense>

            </div>
        </div>
    );
}
