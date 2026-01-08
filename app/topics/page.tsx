import { createSupabaseServerClient } from "../lib/supabase/server";
import ForumTopics from "../components/ForumTopics";
import styles from "../page.module.css";

export default async function TopicsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: topics } = await supabase
    .from("topics")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>All Topics</h1>
      <ForumTopics topics={topics ?? []} />
    </main>
  );
}
