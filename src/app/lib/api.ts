import { Post } from "../types";


export async function fetchData() {
    Promise<Post[]>
    const response = await fetch("http://localhost:3001/posts");
    const data = await response.json();
    return data;
}