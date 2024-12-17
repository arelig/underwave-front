"use client"
import { useState, useEffect, Suspense } from "react";
import { Carousel, IconButton, Spinner } from "@material-tailwind/react";
//import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import AlbumCard from "@components/catalog/Album";
import getAlbums from "@lib/getAlbums";
import { useMediaQuery } from "react-responsive";

const AlbumCarousel = () => {
    const [localAlbums, setLocalAlbums] = useState([]);
    const isDesktop = useMediaQuery({ minWidth: 768 });

    useEffect(() => {
        async function fetchData() {
            const albums = await getAlbums();
            if (Array.isArray(albums)) {
                setLocalAlbums(albums);
            } else {
                console.error('Fetched data is not an array:', albums);
            }
        }
        fetchData();
    }, []);

    // Function to shuffle the array
    const shuffle = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const getAlbumsPerSlide = () => {
        return isDesktop ? 5 : 1; // Show 5 albums per slide on desktop, 1 on mobile
    };

    // Get a random list of albums
    const randomAlbums = shuffle(localAlbums).slice(0, 10);

    return (
            <Carousel
                className="p-5 m-2"
                loop={true}
                prevArrow={({ handlePrev }) => (
                    <IconButton
                        variant="text"
                        color="deep-purple"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute top-2/4 -translate-y-2/4 left-4"
                    >
                        {/*<ArrowLeftIcon strokeWidth={2} className="w-6 h-6 indigo-900" />*/}
                    </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                    <IconButton
                        variant="text"
                        color="deep-purple"
                        size="lg"
                        onClick={handleNext}
                        className="!absolute top-2/4 -translate-y-2/4 !right-4"
                    >
                        {/* <ArrowRightIcon strokeWidth={2} className="w-6 h-6 indigo-900 " /> */}
                    </IconButton>
                )}
                navigation={({ setActiveIndex, activeIndex }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {Array.from({ length: Math.ceil(randomAlbums.length / getAlbumsPerSlide()) }).map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                                    Math.floor(activeIndex / getAlbumsPerSlide()) === i ? "bg-stone-800 w-8" : "bg-stone/50 w-4"
                                }`}
                                onClick={() => setActiveIndex(i * getAlbumsPerSlide())}
                            />
                        ))}
                    </div>
                )}
            >
                {Array.from({ length: Math.ceil(randomAlbums.length / getAlbumsPerSlide()) }).map((_, i) => (
                    <div key={i} className="grid grid-cols-5 gap-4">
                        {randomAlbums
                            .slice(i * getAlbumsPerSlide(), i * getAlbumsPerSlide() + getAlbumsPerSlide())
                            .map((album) => (
                                <AlbumCard
                                    key={album.id}
                                    data={album}
                                    className="transition ease-in-out delay-100 hover:-translate-y-1 scale-100 duration-300 bg-transparent"
                                />
                            ))}
                    </div>
                ))}
            </Carousel>

    );
}

export default AlbumCarousel;