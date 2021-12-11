import { User } from "./user.dto";

export interface CreateCommentDto {
    postId: number,
    comment: string
}

export interface Comment {
    "id": number,
    "postId": number,
    "userWhoCommented": number,
    "comment": any,
    "createdAt": string,
    "updatedAt": string
}

export interface CommentDetail {
    "id": number,
    "postId": number,
    "userWhoCommented": number,
    "comment": any,
    "createdAt": string,
    "updatedAt": string
}