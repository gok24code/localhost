import styles from "./ForumTopics.module.css";

// Define the type for a single topic
interface Topic {
  id: string;
  created_at: string;
  title: string;
  category: string | null;
  author_username: string;
}

interface ForumTopicsProps {
  topics: Topic[];
}

const ForumTopics: React.FC<ForumTopicsProps> = ({ topics }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Recent Discussions</h2>
      <div className={styles.topicsList}>
        {topics.length === 0 ? (
          <div className={styles.noTopicsMessage}>
            <p>Nothing is popular here yet.</p>
            <span>Be the first to post a topic!</span>
          </div>
        ) : (
          topics.map((topic) => (
            <a href={`/topic/${topic.id}`} key={topic.id} className={styles.topicItem}>
              <div className={styles.topicContent}>
                <div className={styles.topicDetails}>
                  {topic.category && (
                    <span className={styles.category}>{topic.category}</span>
                  )}
                  <h3 className={styles.topicTitle}>{topic.title}</h3>
                  <p className={styles.meta}>
                    by <span className={styles.author}>{topic.author_username}</span> •{" "}
                    {new Date(topic.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* In a real app, you might fetch reply counts separately */}
            </a>
          ))
        )}
      </div>
    </section>
  );
};

export default ForumTopics;
