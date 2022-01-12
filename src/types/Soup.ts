import { User } from "./User";

export interface Soup {
    soupNo: number,
    soupImgId: string,
    createTime: Date,
    owner: User,
    sender: User
}