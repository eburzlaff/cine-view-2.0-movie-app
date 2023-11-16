import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContext from './context/context';
import { fetchDataFromApi } from './api/tmdb';
import { fetchApiConfig } from './api/tmdb';
import { fetchMovieGenres } from './api/tmdb';
import { fetchTvGenres } from './api/tmdb';

import ContentWrapper from './components/ContentWrapper';
import Homepage from './pages/Homepage';
import Explore from './pages/explore/Explore';
import MovieDetails from './pages/MovieDetails';
import SearchResults from './pages/searchResults/SearchResults';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [apiConfig, setApiConfig] = useState();
  const [movieGenres, setMovieGenres] = useState();
  const [tvGenres, setTvGenres] = useState();

  useEffect(() => {
    getConfig();
    getMovieGenres();
    getTvGenres();
  }, [])
  
  const getConfig = async () => {
    const config = await fetchApiConfig();
    setApiConfig(config);
  }

  const getMovieGenres = async () => {
    const movieGenres = await fetchMovieGenres();
    setMovieGenres(movieGenres);
  }

  const getTvGenres = async () => {
    const tvGenres = await fetchTvGenres();
    setTvGenres(tvGenres);
  }

  return (
    <AppContext.Provider value={{apiConfig, movieGenres, tvGenres}}>
      <div className='min-h-screen w-screen bg-[#04152d] overflow-hidden'>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:mediaType/:id" element={<MovieDetails />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
          </Routes>
          <Footer/>
        </BrowserRouter>     
      </div>
    </AppContext.Provider>
    
  )
}

export default App
