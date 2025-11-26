const getInstructors = async () => {
    const response = await fetch("/trevo/data/instructors.json");
    const data = await response.json();
    return data;
};

export { getInstructors };