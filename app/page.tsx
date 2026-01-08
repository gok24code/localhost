import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ForumTopics from "./components/ForumTopics";
import { createSupabaseServerClient } from "./lib/supabase/server";
import styles from "./page.module.css";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data: topics } = await supabase
    .from("topics")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <ForumTopics topics={topics ?? []} />
    </main>
  );
}