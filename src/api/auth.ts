import axios, { AxiosResponse } from 'axios';
import { User } from '../types/User'

const endpoint = 'https://up-dolphin-98.hasura.app/api/rest/MyMutation'

const instance = axios.create({
    baseURL: endpoint,
    timeout : 15000,
})

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    setUser: (user: User) => instance.post(endpoint, {
        query:
        `
        mutation MyMutation($userId: String!, $userName: String!) {
            insert_USER_one(object: {USER_ID: $userId, USER_NAME: $userName}) {
                USER_ID
                USER_NAME
            }
        }
        `,
        variables: {
            userId: user.userId,
            userName: user.userName
        }
    }).then(responseBody) 
}

export const Auth = {
    setUser: (user: User): Promise<User> => request.setUser(user),
}