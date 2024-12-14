"use client"
import {
	Checkbox,
	Card,
	List,
	ListItem,
	ListItemPrefix,
	Typography
} from "@material-tailwind/react";

import { useEffect, useState } from "react";

export default function FilterGenre({data, onGenreChange }) {
	const [selectedGenres, setSelectedGenres] = useState([]);

	const handleGenreChange = (genreId) => {
		setSelectedGenres((prevSelectedGenres) => {
			const isSelected = prevSelectedGenres.includes(genreId);
	  
			if (isSelected) {
			  return prevSelectedGenres.filter((id) => id !== genreId);
			} else {
			  return [...prevSelectedGenres, genreId];
			}
		  });
	};

	useEffect(() => {
		// Llama a la función onGenreChange con los géneros seleccionados cada vez que selectedGenres cambie
		onGenreChange(selectedGenres);
	  }, [selectedGenres, onGenreChange]);

	return (
		<Card color="transparent" shadow={false} className="flex min-w-fit max-w-full justify-center">
			<List className=""> 
				{data.map((genre) => {
					return (
						<ListItem key={genre.id}  className="p-0">
							<label htmlFor={genre.id} className="px-3 py-2 flex items-center w-full cursor-pointer">
								<ListItemPrefix className="mr-3">
									<Checkbox 
										id={genre.id}
										ripple={false} 
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0"
										}}
										checked={selectedGenres.includes(genre.id)}
										onChange={()=> handleGenreChange(genre.id)}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium">{genre.name}</Typography>
							</label>
						</ListItem>
				)})}
			</List>
		</Card>
	);
}