import axios, { AxiosResponse } from 'axios';
import { Pageable } from '../types/Pageable';
import { Soup } from '../types/Soup';
import { User } from '../types/User';

const endpoint = 'https://up-dolphin-98.hasura.app/v1/graphql'

axios.defaults.baseURL = endpoint;
axios.defaults.timeout = 15000;

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    //사용자 별 수프 리스트 가져오기
    getSoup: (user: User, pageable: Pageable) => axios.post(endpoint, {
        query:
        `
            query getSoupList($userId: String!, $page: Int!, $size: Int!) {
                SOUP(where: {USER_ID: {_eq: $userId}}, limit: $size, offset: $page) {
                    SOUP_NO
                    SOUP_IMG_ID
                    CREATE_TIME
                    OWNER {
                        USER_NO
                        USER_ID
                        USER_NAME
                    }
                    SENDER {
                        USER_NO
                        USER_ID
                        USER_NAME
                    }
                }
                SOUP_aggregate(where: {USER_ID: {_eq: $userId}}) {
                    aggregate {
                        count
                    }
                }
            }
        `,
        variables: {
            userId: user.userId,
            size: pageable.size,
            page: pageable.page
        }
    }).then(responseBody),
}

export const SoupAPI = {
    getSoup: (user: User, pageable: Pageable) : Promise<Soup> => request.getSoup(user, pageable)
}