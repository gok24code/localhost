import styles from "./support.module.css";
import StackOverflowTopics from "./components/StackOverflowTopics";
import GitHubReviewedTopics from "./components/GitHubReviewedTopics";
import WebSearchBar from "./components/WebSearchBar"; // Import the component

export default function SupportPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Technical Support & Resources</h1>
      <p className={styles.description}>
        Find solutions to common problems, explore popular discussions, and search the web for your technical issues.
      </p>

      {/* Stack Overflow Topics */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Popular Stack Overflow Topics</h2>
        <StackOverflowTopics />
      </section>

      {/* GitHub Reviewed Topics */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Most Reviewed GitHub Topics</h2>
        <GitHubReviewedTopics />
      </section>

      {/* Web Search Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Search the Web for an Issue</h2>
        <WebSearchBar /> {/* Integrate the component */}
      </section>
    </div>
  );
}
