import Image from "next/image";
import styles from "./ForumTopics.module.css";

// Mock data for forum topics
const topics = [
  {
    id: 1,
    title: "What's your favorite CSS framework in 2026?",
    category: "Web Development",
    author: "coderella",
    replies: 28,
    time: "3 hours ago",
    avatar: "/avatars/avatar1.svg",
  },
  {
    id: 2,
    title: "Showcase: My new Next.js portfolio",
    category: "Showcase",
    author: "dev_dude",
    replies: 15,
    time: "5 hours ago",
    avatar: "/avatars/avatar2.svg",
  },
  {
    id: 3,
    title: "Best practices for state management in large React apps?",
    category: "React",
    author: "react_fan",
    replies: 42,
    time: "1 day ago",
    avatar: "/avatars/avatar3.svg",
  },
  {
    id: 4,
    title: "Off-topic: What are you playing this weekend?",
    category: "General Chat",
    author: "gamer_x",
    replies: 76,
    time: "2 days ago",
    avatar: "/avatars/avatar4.svg",
  },
];

const ForumTopics = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Recent Discussions</h2>
      <div className={styles.topicsList}>
        {topics.map((topic) => (
          <a href="#" key={topic.id} className={styles.topicItem}>
            <div className={styles.topicContent}>
              <Image
                src={topic.avatar}
                alt={`${topic.author}'s avatar`}
                width={50}
                height={50}
                className={styles.avatar}
              />
              <div className={styles.topicDetails}>
                <span className={styles.category}>{topic.category}</span>
                <h3 className={styles.topicTitle}>{topic.title}</h3>
                <p className={styles.meta}>
                  by <span className={styles.author}>{topic.author}</span> •{" "}
                  {topic.replies} replies • {topic.time}
                </p>
              </div>
            </div>
            <div className={styles.repliesCount}>
              <span>{topic.replies}</span>
              <p>replies</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ForumTopics;
