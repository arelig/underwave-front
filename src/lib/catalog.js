export async function getAlbums() {
    try {
        const res = await fetch('http://localhost:8000/api/albums/');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data; 
    } catch (error) {
        console.error('Failed to fetch albums:', error);
        return []; 
    }
}

export async function getGenres () {
    try {
        const res = await fetch('http://localhost:8000/api/genres/');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    }catch (error) {
        console.error('Failed to fetch genres:', error);
        return []; 
    }
}



