import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BookmarkList, { Bookmark } from "@/components/ui/BookmarkList";

export default async function BookmarkSection() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id);

  return (
    <BookmarkList
      initialBookmarks={bookmarks as Bookmark[]}
      userId={user.id}
    />
  );
}
