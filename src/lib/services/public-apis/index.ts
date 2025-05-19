import { Octokit } from 'octokit';

export const fetchResources = async (file: string) => {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

  const { data } = await octokit.rest.repos.getContent({
    owner: 'marcelscruz',
    repo: 'public-apis',
    path: `/db/${file}.json`,
  });

  if (data.download_url) {
    const result = await fetch(data.download_url);

    if (!result.ok) {
      throw new Error(`Unexpected response ${result.statusText}`);
    }

    return result.json();
  }

  throw new Error('Download URL not found');
};
