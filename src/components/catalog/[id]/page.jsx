"use client"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Typography } from "@material-tailwind/react"
import AlbumCard from '@components/catalog/Album'

const AlbumPage = () => {
    const router = useRouter()
    const { uuid } = router.query
    const [albumDetails, setAlbumDetails] = useState(null)

    useEffect(() => {
        if (router.query.album) {
        setAlbumDetails(JSON.parse(router.query.album))
        }
    }, [router.query.album])

  if (!albumDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h3" className="text-indigo-900">
        {albumDetails.name}
      </Typography>
      <Typography variant="h5" className="text-gray-700">
        {albumDetails.artist}
      </Typography>
      <AlbumCard data={albumDetails} />
    </div>
  )
}

export default AlbumPage