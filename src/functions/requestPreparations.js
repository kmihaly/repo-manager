import { gql } from '@apollo/client'

const createRepositoryQuery = username => {

    const REPOSITORIES_QUERY = gql`
        query repoQuery($after: String, $before: String, $first: Int, $last: Int) {
            user(login: "${username}") {
                repositories(first: $first, last: $last, after: $after, before: $before) {
                    totalCount
                    nodes {
                        description
                        issues {
                            totalCount
                        }
                        pullRequests {
                            totalCount
                        }
                        name
                        commitComments(last: 1) {
                            nodes {
                                createdAt
                            }
                        }
                        isFork
                        id
                        url
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                        hasPreviousPage
                        startCursor
                    }
                    edges {
                        cursor
                    }
                }
                id
            }      
        }
    `

    return REPOSITORIES_QUERY
}

const createRepositoryMutation = () => {
    
    const REPOSITORY_MUTATION = gql`
        mutation createRepository($input: CreateRepositoryInput!) {
            createRepository(input: $input) {
                repository
                {
                    name
                    createdAt
                }
            }
        }
    `
    return REPOSITORY_MUTATION
}

export { createRepositoryMutation, createRepositoryQuery }
