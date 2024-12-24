import Button from "@components/material/CustomButton";

export function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {genres.map((genre) => (
        <Button
          key={genre.id}
          variant={selectedGenre === genre.id ? "default" : "outline"} 
          onClick={() => onSelectGenre(genre.id)} 
          color="black"
        >
          {genre.name}
        </Button>
      ))}
    </div>
  )
}