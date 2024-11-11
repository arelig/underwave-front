async function getAlbums() { 
    const res = await fetch('https://cyber-seekers-herlein-iglesias.vercel.app/rest/albums', {cache: 'no-cache'});
    return res.json();
}

export default getAlbums