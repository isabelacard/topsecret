const getUsers = async () => {
    const response = await fetch("/trevo/data/user.json");
    const data = await response.json();
    return data;
};

export { getUsers };