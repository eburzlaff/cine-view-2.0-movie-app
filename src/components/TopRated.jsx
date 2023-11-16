import { useEffect, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import { fetchDataFromApi } from '../api/tmdb';
import Carousel from './carousel/Carousel';
import TabSwitch from './TabSwitch';

function TopRated(props) {

    const [endpoint, setEndpoint] = useState("movie");
    const [data, setData] = useState();

    useEffect(() => {
      getTopRatedMovies();
    }, [endpoint])

    const getTopRatedMovies = async () => {
        try {
            const data = await fetchDataFromApi(`/${endpoint}/top_rated`);
            setData(data);
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    
    return (
        <div className='mb-20'>
            <div className='flex flex-col md:flex-row gap-5 md:justify-between items-center mb-5'>
                <h2 className='text-white text-2xl font-medium'>Top Rated</h2>
                <TabSwitch tabOne="Movies" tabTwo="TV Shows" endpointOne="movie" endpointTwo="tv" setEndpoint={setEndpoint}/>
            </div>
            <Carousel mediaType={endpoint === "movie" ? "movie" : "tv"} data={data}/>
        </div>
    );
}

export default TopRated;