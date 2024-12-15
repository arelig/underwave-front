async function getGenres () {
    const res = await fetch('https://cyber-seekers-herlein-iglesias.vercel.app/rest/genres', {cache: 'no-cache'});
    return res.json()
}

export default getGenres