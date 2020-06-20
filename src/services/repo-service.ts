import axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.github.com"
})

export const repoService = {
    getRepos(query: string, page: number = 1, perPage: number = 10): Promise<GetReposResponseType> {

        // if query not passed then return most starred repositories
        if (!query) query = "stars:>100";

        return instance
            .get<GetReposResponseType>(`/search/repositories?q=${query}&sort=stars&o=desc&page=${page}&per_page=${perPage}`)
            .then(res => res.data)
    },
    getSingleRepo(owner: string, repo: string) {
        return instance
            .get<RepoDetailsType>(`/repos/${owner}/${repo}`)
            .then(res => res.data);
    }
}

type RepoOwnerType = {
    "login": string
    "id": number
    "node_id": string
    "avatar_url": string
    "gravatar_id": string
    "url": string
    "received_events_url": string
    "type": "User" | "Organization"
}
type LicenseType = {
    "key": string,
    "name": string,
    "spdx_id": string,
    "url": string,
    "node_id": string
}


export type RepoType = {
    "id": number
    "node_id": string
    "name": string
    "full_name": string
    "owner": RepoOwnerType
    "private": boolean
    "html_url": string
    "description": string
    "fork": boolean
    "url": string
    "created_at": string
    "updated_at": string
    "pushed_at": string
    "homepage": string
    "size": number
    "stargazers_count": number
    "watchers_count": number
    "language": string
    "forks_count": number
    "open_issues_count": number
    "master_branch": string
    "default_branch": string
    "score": number
}

export type RepoDetailsType = RepoType & {
    "license": LicenseType
}

type GetReposResponseType = {
    total_count: number
    incomplete_results: boolean
    items: Array<RepoType>
}
