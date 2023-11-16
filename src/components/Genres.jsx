import { useContext, useState, useEffect } from 'react';

import { fetchMovieGenres } from '../api/tmdb';
import { fetchTvGenres } from '../api/tmdb';
import AppContext from '../context/context';

function Genres({ids}) {

    const [movieGenre, setMovieGenre] = useState();
    const [tvGenre, setTvGenre] = useState();

    const getMovieGenres = async () => {
        const movieGenres = await fetchMovieGenres();
        setMovieGenre(movieGenres);
    }
    
    const getTvGenres = async () => {
        const tvGenres = await fetchTvGenres();
        setTvGenre(tvGenres);
    }

    const findGenreNameById = (genreId) => {    
        const foundGenre = movieGenre.genres && movieGenre.genres.find(genre => genre.id === genreId) || tvGenre.genres.find(genre => genre.id === genreId);
        return foundGenre && foundGenre.name;       
    }

    useEffect(() => {
        getMovieGenres();
        getTvGenres();
    }, [])
    
    
    return (
        <div className='hidden lg:flex flex-wrap flex-col flex-wrap gap-2'>
            {ids?.length >= 1 && movieGenre && tvGenre && ids.map((genreId, i) => (
                <div key={i} className='text-white bg-rose-500 rounded-xl py-1 px-2 text-center text-xs'>{findGenreNameById(genreId)}</div>
            ))}
            
        </div>
    );
}

export default Genres; 