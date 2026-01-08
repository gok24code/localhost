// app/support/components/GitHubReviewedTopics.tsx
import { getMostStarredGitHubRepositories } from "@/app/utils/githubApi";
import styles from "../support.module.css"; // Reuse support page styles

interface GitHubRepository {
  name: string;
  description: string;
  stars: number;
  url: string;
}

export default async function GitHubReviewedTopics() {
  const repositories: GitHubRepository[] = await getMostStarredGitHubRepositories(10); // Fetch top 10 repositories

  return (
    <>
      {repositories.length > 0 ? (
        <div className={styles.topicsGrid}>
          {repositories.map((repo: GitHubRepository) => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className={styles.topicCard}>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <p>⭐️ {repo.stars}</p>
            </a>
          ))}
        </div>
      ) : (
        <p>No most starred GitHub repositories found at the moment.</p>
      )}
    </>
  );
}
