import ForumTopics from "../components/ForumTopics";
import styles from "../page.module.css";

export default async function TopicsPage() {
  // In a static technical guide, topics would either be hardcoded or removed.
  // For now, an empty array to prevent errors.
  const topics: any[] = []; // Assuming ForumTopics can handle an empty array

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>All Topics</h1>
      <ForumTopics topics={topics} />
    </main>
  );
}
