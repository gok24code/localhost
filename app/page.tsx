import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ForumTopics from "./components/ForumTopics";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <ForumTopics />
      {/* Other sections like About, Crew, QNA can be added here later */}
    </main>
  );
}