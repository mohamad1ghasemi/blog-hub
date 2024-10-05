export async function fetchData() {
    const response = await fetch("http://localhost:3001/posts");
    const data = await response.json();
    return data;
}