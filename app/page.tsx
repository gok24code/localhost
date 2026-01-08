import Hero from "./components/Hero";
import ForumTopics from "./components/ForumTopics";

import styles from "./page.module.css";

export default async function Home() {
  // In a static technical guide, topics would either be hardcoded or removed.
  // For now, an empty array to prevent errors.
  const topics: any[] = []; // Assuming ForumTopics can handle an empty array

  return (
    <main className={styles.main}>
      <Hero />
      <ForumTopics topics={topics} />
    </main>
  );
}