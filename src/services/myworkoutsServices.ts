const getMyworkouts = async () => {
    const response = await fetch("../data/myworkouts.json");
    const data = await response.json();
    return data;
};

export { getMyworkouts };