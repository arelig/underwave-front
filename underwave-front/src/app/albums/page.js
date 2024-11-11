"use client";
import React, { useState, useEffect } from "react";
import Grid from "@components/album/AlbumGrid";
import FilterGenre from "@/components/album/FilterGenres";
import getGenres from "@/app/lib/getGenres";
import getAlbums from "@/app/lib/getAlbums";
import { Typography } from "@material-tailwind/react";

const Page = () => {
  const [localGenres, setLocalGenres] = useState([]);
  const [localAlbums, setLocalAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    // Función asincrónica para obtener los géneros y los álbumes
    async function fetchData() {
      const genres = await getGenres();
      const albums = await getAlbums();

      setLocalGenres(genres.data);
      setLocalAlbums(albums.data);
      setFilteredAlbums(albums.data);
    }

    fetchData();
  }, []);

  // Función para manejar el cambio de género
  const handleGenreChange = (selectedGenres) => {
    if (selectedGenres.length === 0) {
      // Si no hay géneros seleccionados, muestra todos los álbums
      setFilteredAlbums(localAlbums);
    } else {
      // Filtra los álbums basados en los géneros seleccionados
      const filtered = localAlbums.filter((album) =>
        selectedGenres.includes(album.genre_id)
      );
      setFilteredAlbums(filtered);
    }
  };

  return (    
  <>
    <div className="container mx-auto px-4 py-8 border-none">
      <div className="max-w-7xl mx-auto bg-transparent rounded overflow-hidden">
        <div className="grid grid-flow-row md:grid-flow-col">
          <div className="p-5">
          <Typography variant="h3" className="text-indigo-900 flex items-center justify-center">
              Géneros
            </Typography>
            <FilterGenre data={localGenres} onGenreChange={handleGenreChange} />
          </div>
          <div className="p-5">
            <Typography variant="h3" className="text-indigo-900 flex items-center justify-center">
              Albums
            </Typography>
            <Grid data={filteredAlbums} />
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Page;