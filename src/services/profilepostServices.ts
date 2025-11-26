const getProfilePost = async () => {
    const response = await fetch("/trevo/data/profilepost.json");
    const data = await response.json();
    console.info("📦 Data:", data); // Debug
    console.info("📦 data.posts:", data.posts); // Debug
    return data.posts; // ✅ Devolver solo el array
};

export { getProfilePost };