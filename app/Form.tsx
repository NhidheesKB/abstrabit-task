import Input from "@/components/ui/Input";
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
  async function addBookmark(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const title = formData.get("title") as string;
    const url = formData.get("url") as string;

    if (!title || !url) {
      throw new Error("Missing fields");
    }
    const { error,status,data } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);
    console.log("data",data,error,status)
    if (error) {
      throw new Error(error.message);
    }
    else{
      redirect('/list-bookmarks')
    }
  }

  const baseParams = {
    labelClass:
      "block text-sm font-medium text-gray-700 mb-1",
    class:
      "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black focus:border-black outline-none transition",
  };

  const inputFields = [
    {
      type: "text",
      name: "title",
      label: "Bookmark Title",
      placeholder: "My Github Link",
      ...baseParams,
    },
    {
      type: "url",
      name: "url",
      label: "Bookmark Url",
      placeholder: "https://example.com",
      ...baseParams,
    },
  ];

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome {user.user_metadata.full_name}
        </h1>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      <div className="border-t border-gray-200" />
      <form action={addBookmark} className="space-y-5">
        {inputFields.map((field, index) => (
          <Input key={index} {...field} />
        ))}

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
