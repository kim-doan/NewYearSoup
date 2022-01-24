import axios, { AxiosResponse } from 'axios';
import { User } from '../types/User'

const endpoint = 'https://up-dolphin-98.hasura.app/v1/graphql'

axios.defaults.baseURL = endpoint;
axios.defaults.timeout = 15000;

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    //사용자 등록 (회원가입)
    addUser: (user: User) => axios.post(endpoint, {
        query:
            `
            mutation addUser($userId: String!, $userName: String!, $userEmail: String!) {
                insert_USER(objects: {USER_EMAIL: $userEmail, USER_ID: $userId, USER_NAME: $userName}) {
                affected_rows
                }
            }
        `,
        variables: {
            userId: user.userId,
            userName: user.userName,
            userEmail: user.userEmail,
        },
    }).then(responseBody),
    //회원가입 여부
    isSignUp: (user: User) => axios.post(endpoint, {
        query:
            `
            query isSignUp($userId: String!) {
                USER_aggregate(where: {USER_ID: {_eq: $userId}}) {
                    aggregate {
                        count
                    }
                }
            }
        `,
        variables: {
            userId: user.userId
        }
    }).then(responseBody),
    //전체 회원 ID 불러오기
    getUser: (user: User) => axios.post(endpoint, {
        query:
            `
            query findByUserId($userId: String!) {
                USER(where: {USER_ID: {_eq: $userId}}) {
                    USER_EMAIL
                    USER_ID
                    USER_NAME
                }
            }
        `,
        variables: {
            userId: user.userId
        }
    }).then(responseBody),
}

export const AuthAPI = {
    addUser: (user: User): Promise<User> => request.addUser(user),
    isSignUp: (user: User): Promise<Number> => request.isSignUp(user),
    getUser: (user: User): Promise<User> => request.getUser(user),
}