import { createSupabaseServerClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import styles from "./new-topic.module.css";

export default async function NewTopicPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const createTopic = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const supabase = createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/login");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (!profile) {
      // This should ideally not happen due to the trigger we created
      // but it's good practice to handle it.
      return redirect("/dashboard?error=Profile not found");
    }

    const { error } = await supabase.from("topics").insert([
      {
        title,
        category,
        author_username: profile.username,
      },
    ]);

    if (error) {
      return redirect(`/topics/new?error=${error.message}`);
    }

    // Redirect to the home page to see the new topic
    redirect("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Topic</h1>
      <form action={createTopic} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Topic Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="What's on your mind?"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="e.g., Web Development, Showcase, General"
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Post Topic
        </button>
      </form>
    </div>
  );
}
