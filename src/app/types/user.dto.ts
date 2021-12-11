import { Comment } from "./comment.dto";
import { Like } from "./like.dto";
import { Post } from "./post.dto";

export interface CreateUserDto {
    name: string
    email: string
    password: string
}

export interface LoginDto {
    readonly email: string;
    readonly password: string;
}

export interface UserDataDto {
    readonly email?: string;
    readonly userId: string;
    readonly token?: string
}

export interface AuthDto {
    userId: number,
    token: string
}

export interface User {
    "id": number,
    "name": string,
    "email": string,
    "password": string,
    "date_created": string,
    "createdAt": string,
    "updatedAt": string
}

export interface UserDetail {
    "id": number,
    "name": string,
    "email": string,
    "password": string,
    "date_created": string,
    "createdAt": string,
    "updatedAt": string,
    "posts": Post[],
    "comments": Comment[],
    "likes": Like[]
}