export interface CreateLikeDto {
    "postId": number
}

export interface Like {
    "id": number,
    "postId": number,
    "userWhoLiked": number,
    "createdAt": string,
    "updatedAt": string
}