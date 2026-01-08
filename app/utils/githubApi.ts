// app/utils/githubApi.ts

const GITHUB_API_BASE_URL = "https://api.github.com";

export async function getMostStarredGitHubRepositories(count: number = 10) {
  // Get date 30 days ago to find "trending" repositories
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const createdDate = thirtyDaysAgo.toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/search/repositories?q=created:>${createdDate}&sort=stars&order=desc&per_page=${count}`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items.map((item: any) => ({
      name: item.full_name,
      description: item.description,
      stars: item.stargazers_count,
      url: item.html_url,
    }));
  } catch (error) {
    console.error("Failed to fetch most starred GitHub repositories:", error);
    return [];
  }
}
