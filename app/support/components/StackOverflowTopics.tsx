// app/support/components/StackOverflowTopics.tsx
import { getPopularStackOverflowTags } from "@/app/utils/stackOverflowApi";
import styles from "../support.module.css"; // Reuse support page styles

interface StackOverflowTag {
  name: string;
  count: number;
}

export default async function StackOverflowTopics() {
  const popularTags: StackOverflowTag[] = await getPopularStackOverflowTags(10); // Fetch top 10 popular tags

  return (
    <>
      {popularTags.length > 0 ? (
        <div className={styles.topicsGrid}>
          {popularTags.map((tag: StackOverflowTag) => ( // Explicitly type tag
            <div key={tag.name} className={styles.topicCard}>
              <h3>{tag.name}</h3>
              <p>Questions: {tag.count}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No popular Stack Overflow topics found at the moment.</p>
      )}
    </>
  );
}
