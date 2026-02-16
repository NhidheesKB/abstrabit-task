import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function FormHandller() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome {user.user_metadata.full_name}
          </h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <div className="border-t border-gray-200" />

        <form
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bookmark Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Supabase Docs"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bookmark URL
            </label>
            <input
              type="url"
              name="url"
              required
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 active:scale-[0.98] transition"
          >
            Add Bookmark
          </button>
        </form>
      </div>
  );
}
