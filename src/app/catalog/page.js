'use client'

import { useState, useEffect, useCallback } from 'react'
import Albums from '@/components/catalog/Albums'
import { GenreFilter } from '@/components/catalog/GenreFilter'
import { getAlbums, getGenres } from '@lib/catalog'
import Typography from '@components/material/CustomTypography'

export default function CatalogPage() {
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [albums, setAlbums] = useState([])
  const [genres, setGenres] = useState([])


  // Fetch albums and genres on page load once
  useEffect(() => {
    async function fetchData() {
      const albums = await getAlbums()
      const genres = await getGenres()

      setAlbums(albums)
      setGenres(genres)
    }

    fetchData()
  }, [])

  const handleGenreChange = useCallback((genreId) => {
    setSelectedGenre(genreId)
  }, [])

  const filteredAlbums = selectedGenre === "All"
    ? albums
    : albums.filter(album => {
        return album.genre === selectedGenre
      })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Catalog</h1>
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={handleGenreChange}
      />
      {filteredAlbums.length > 0 ? (
              <Albums data={filteredAlbums} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Typography variant="h4" className="text-gray-500">
                  Oops, nada por aquí.
                </Typography>
              </div>
            )}
    </div>
  )
}
