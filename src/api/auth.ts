import axios, { AxiosResponse } from 'axios';
import { User } from '../types/User'

const endpoint = 'https://up-dolphin-98.hasura.app/v1/graphql'

const instance = axios.create({
    baseURL: endpoint,
    timeout: 15000,
    // headers: {
    //     'x-hasura-admin-secret': "vGgKCJNTQyy1C3nIKFIBzJzsIFmLQAgBRACmoupWJZW5kG6rXwCsX2USUVAujpXf"
    // }
})

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    setUser: (user: User) => instance.post(endpoint, {
        query:
            `
        mutation MyMutation($userId: String!, $userName: String!, $userEmail: String!) {
            insert_USER(objects: {USER_EMAIL: $userEmail, USER_ID: $userId, USER_NAME: $userName}) {
            affected_rows
            }
        }
        `,
        variables: {
            userId: user.userId,
            userName: user.userName,
            userEmail: user.userEmail,
        }
    }).then(responseBody)
}

export const Auth = {
    setUser: (user: User): Promise<User> => request.setUser(user),
}