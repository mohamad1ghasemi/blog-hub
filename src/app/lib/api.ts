export async function fetchData(fetchAddress: string = "") {
    let response;

    if (fetchAddress === "") {
        response = await fetch("http://localhost:3001/posts");
    } else {
        response = await fetch(fetchAddress);
    }

    if (!response.ok) {
        throw new Error(`خطا در دریافت اطلاعات...`);
    }

    const data = await response.json();
    return data;
}
