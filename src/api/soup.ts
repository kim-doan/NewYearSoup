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
                SOUP(where: {USER_ID: {_eq: $userId}}, order_by: { SOUP_NO: desc }, limit: $size, offset: $page) {
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
            page: pageable.page * pageable.size
        }
    }).then(responseBody),
    getSoupDetail: (soupNo: Number) => axios.post(endpoint, {
        query:
            `
            query getSoupDetail($soupNo: Int!) {
                SOUP_DETAIL(where: { SOUP_NO:{_eq:$soupNo} }) {
                    USER_ID
                    REQ_USER_ID
                    SOUP_NO
                    SOUP_CONTENTS
                }
            }
        `,
        variables: {
            soupNo: soupNo
        }
    }).then(responseBody),
    addSoup: (param) => axios.post(endpoint, {
        query:
            `
            mutation addSoup($userId: String!, $soupImgId: String!, $reqUserId: String!, $soupContents: String!) {
                insert_SOUP(objects: {USER_ID: $userId, SOUP_IMG_ID: $soupImgId, REQ_USER_ID: $reqUserId, SOUP_DETAIL: {data: { SOUP_CONTENTS: $soupContents, USER_ID: $userId, REQ_USER_ID: $reqUserId }}}) {
                    affected_rows
                }
            }

        `,
        variables: {
            userId: param.owner,
            soupImgId: param.soupImgId,
            reqUserId: param.sender,
            soupContents: param.message,
        }
    }).then(responseBody),
}

export const SoupAPI = {
    getSoup: (user: User, pageable: Pageable): Promise<Soup> => request.getSoup(user, pageable),
    getSoupDetail: (soupNo: Number): Promise<Soup> => request.getSoupDetail(soupNo),
    addSoup: (param): Promise<Soup> => request.addSoup(param),
}