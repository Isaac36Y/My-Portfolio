'use server'

const GITHUB_TOKEN = process.env.GITHUB_API_TOKEN;
const USERNAME = "Isaac36Y";

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export default async function getGitHubContributions() {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: USERNAME} 
      })
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error("GraphQL Error:", result.errors);
      return;
    }

    return result
    
  } catch (error) {
    console.error("Request failed:", error);
  }
}

export async function getHalfYearContributions() {
    const contributions = await getGitHubContributions();
    const weeks =
        contributions?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

    // The API always answers with a full year; keep only the recent half.
    return weeks.slice(26).flatMap((week: { contributionDays: any[] }) =>
        week.contributionDays.map((day: { date: string; contributionCount: number }) => ({
            date: day.date,        // "2026-08-19"
            count: day.contributionCount,
        }))
    );
}
