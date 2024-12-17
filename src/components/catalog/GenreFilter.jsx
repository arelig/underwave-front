import Button from "@components/material/Button";

export function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {genres.map((genre) => (
        <Button
          key={genre.id} // Use a unique property like `id` for the key
          variant={selectedGenre === genre.id ? "default" : "outline"} // Compare with the correct property
          onClick={() => onSelectGenre(genre.id)} // Pass the correct property
        >
          {genre.name}
        </Button>
      ))}
    </div>
  )
}