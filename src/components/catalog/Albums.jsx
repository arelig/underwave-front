"use client"
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import AlbumCard from "./Album";

export default function Albums({ data: albumsData }){
	const itemsPerPage = 12;
	const [currentPage, setCurrentPage] = useState(0);

	const indexOfLastItem = (currentPage + 1) * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = albumsData.slice(indexOfFirstItem, indexOfLastItem);

	const pageCount = Math.ceil(albumsData.length / itemsPerPage);

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	  }, [currentPage]);
  
	return (
		<>
		<div className="flex flex-wrap grow justify-center p-5">
		  {currentItems.map((album) => (
			<div key={album.id} className="m-3">
			  <AlbumCard data={album} />
			</div>
		  ))}
		</div>
  
		<div className="flex justify-center">
			<ReactPaginate
				previousLabel="Anterior"
				nextLabel="Siguiente"
				breakLabel="..."
				breakClassName="inline-block px-2 text-gray-500"
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageChange}
				containerClassName="pagination"
				pageClassName="inline-block px-2"
				pageLinkClassName="text-indigo-500 hover:text-indigo-700"
				previousClassName="inline-block px-2"
				previousLinkClassName="text-indigo-500 hover:text-indigo-700"
				nextClassName="inline-block px-2"
				nextLinkClassName="text-indigo-500 hover:text-indigo-700"
				activeClassName="font-bold"
				/>
		</div>
	  </>
  );
}
