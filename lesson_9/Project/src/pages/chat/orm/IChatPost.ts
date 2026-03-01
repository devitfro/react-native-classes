import IChatUser from "./IChatUser";

export default interface IChatPost {
    postId: string,
    postAt: Date,
    content: string,
    user: IChatUser,
    cite: IChatPost | null,
}