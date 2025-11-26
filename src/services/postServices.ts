const getPosts = async () => {
    const response = await fetch("../data/post.json");
    const data = await response.json();
    return data;
};

export { getPosts };