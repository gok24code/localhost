import { createSupabaseServerClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import styles from "./new-topic.module.css";

export default async function NewTopicPage() {
    const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const createTopic = async (formData: FormData) => {
    "use server";
    console.log("--- Create Topic Server Action Started ---");

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    console.log("Form Data:", { title, category, content });

    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("Error: User is not authenticated.");
      return redirect("/login");
    }
    console.log("Authenticated User ID:", user.id);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        return redirect(`/topics/new?error=Could not find user profile.`);
    }

    if (!profile) {
      console.error("Error: Profile not found for the user.");
      return redirect(`/topics/new?error=Profile not found.`);
    }
    console.log("Fetched Profile:", profile);

    const { error: insertError } = await supabase.from("topics").insert([
      {
        title,
        category,
        content,
        author_username: profile.username,
      },
    ]);

    if (insertError) {
      console.error("Error inserting topic:", insertError.message);
      // Encode the error message to make it URL-safe
      const errorMessage = encodeURIComponent(insertError.message);
      return redirect(`/topics/new?error=${errorMessage}`);
    }

    console.log("--- Topic Inserted Successfully ---");

    // Revalidate both paths to ensure fresh data
    revalidatePath("/");
    revalidatePath("/topics");

    // Redirect to the topics page to see the new topic
    redirect("/topics");
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
        <div className={styles.inputGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Write the main content of your topic here..."
            required
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Post Topic
        </button>
      </form>
    </div>
  );
}