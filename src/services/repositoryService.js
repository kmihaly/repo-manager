import axios from 'axios'

const PERSONAL_ACCESS_TOKEN = ""

const getUsersRepositories = username => {

    const USERNAME_QUERY = `
        query {
            user(login: ${username}) {
                repositories(first: 50, isFork: false) {
                    nodes {
                        name
                        url
                    }
                }
            }
        }
    `

    axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${PERSONAL_ACCESS_TOKEN}`
        },
        data: {
            query: USERNAME_QUERY
        }
    }).then(result => {
        console.log(result.data)
    }).catch(err => console.log(err))

}

const createRepository = () => { }

export { createRepository, getUsersRepositories }

