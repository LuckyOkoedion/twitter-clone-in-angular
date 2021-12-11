import { Comment } from "./comment.dto";
import { Like } from "./like.dto";
import { User } from "./user.dto";

export interface CreatePostDto {
    post: any
}

export interface Post {
    "id": number,
    "author": number,
    "post": any,
    "createdAt": string,
    "updatedAt": string
}


export interface PostDetail {
    "id": number,
    "author": number,
    "post": any,
    "createdAt": string,
    "updatedAt": string,
    "comments": Comment[],
    "likes": Like[]
}