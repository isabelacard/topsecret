export interface Posttype {
    id: number;
    username: string;
    profilepic: string;
    description: string;
    image: string;
    date: string;
    likes: number;
    hashtag: string;
    comments: comment[];
    userId: string; 
}

export interface comment {
    id: number;
    username: string;
    profilepic: string;
    comment: string;
    likes: number;
    liked: boolean;
    date: string;
}

export interface userType {
    id: string;
    username: string;
    profilePic: string;
    posts: number;
    followers: number;
    workouts: number;
    email: string;
}
