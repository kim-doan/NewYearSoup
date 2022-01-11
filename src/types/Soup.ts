import { User } from "./User";

export interface Soup {
    soupNo: Number,
    soupImgId: String,
    createTime: Date,
    owner: User,
    sender: User
}