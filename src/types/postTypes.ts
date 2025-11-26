type Posttype = {
    id: number;
    profilepic: string;
    username: string;
    date: string;
    description: string;
    image: string;
    likes: number;
    hashtag_id: number;
    hashtag: string;
};

type comment = {
    id: number;
    username: string;
    profilepic: string;
    comment: string;
    likes: number;
    liked: boolean;
    date: string;
};

export type { Posttype, comment };