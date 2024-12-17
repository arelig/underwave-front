async function getAlbums() {
    try {
        const res = await fetch('http://localhost:8000/api/albums/');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data; // Return the data directly
    } catch (error) {
        console.error('Failed to fetch albums:', error);
        return []; // Return an empty array in case of error
    }
}

export default getAlbums;