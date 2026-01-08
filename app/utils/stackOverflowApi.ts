// app/utils/stackOverflowApi.ts

const STACK_API_BASE_URL = "https://api.stackexchange.com/2.3";
const SITE = "stackoverflow";

export async function getPopularStackOverflowTags(count: number = 10) {
  try {
    const response = await fetch(
      `${STACK_API_BASE_URL}/tags?order=desc&sort=popular&site=${SITE}&pagesize=${count}`
    );
    if (!response.ok) {
      throw new Error(`Stack Exchange API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.items.map((item: any) => ({
      name: item.name,
      count: item.count,
    }));
  } catch (error) {
    console.error("Failed to fetch Stack Overflow tags:", error);
    return [];
  }
}

export async function getStackOverflowQuestionsByTag(tag: string, count: number = 5) {
    try {
        const response = await fetch(
            `${STACK_API_BASE_URL}/questions?order=desc&sort=votes&tagged=${tag}&site=${SITE}&pagesize=${count}`
        );
        if (!response.ok) {
            throw new Error(`Stack Exchange API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.items.map((item: any) => ({
            title: item.title,
            link: item.link,
            score: item.score,
            answer_count: item.answer_count
        }));
    } catch (error) {
        console.error(`Failed to fetch Stack Overflow questions for tag "${tag}":`, error);
        return [];
    }
}
