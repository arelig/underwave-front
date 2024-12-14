async function getPopAlbums () {
    const res = await fetch('https://cyber-seekers-herlein-iglesias.vercel.app/rest/albums/genres/2', {cache: 'no-cache'});
    return res.json()
}

export default getPopAlbums