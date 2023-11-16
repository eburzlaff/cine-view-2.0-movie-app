import { useEffect, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import { fetchDataFromApi } from '../api/tmdb';
import Carousel from './carousel/Carousel';
import TabSwitch from './TabSwitch';

function Trending(props) {

    const [endpoint, setEndpoint] = useState("day");
    const [data, setData] = useState();

    useEffect(() => {
      getTrendingMovies();
    }, [endpoint])

    const getTrendingMovies = async () => {
        try {
            const data = await fetchDataFromApi(`/trending/movie/${endpoint}`);
            setData(data);
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    
    return (
        <div className='mb-20'>
            <div className='flex flex-col md:flex-row gap-5 md:justify-between items-center mb-5'>
                <h2 className='text-white text-2xl font-medium'>Trending</h2>
                <TabSwitch tabOne="Day" tabTwo="Week" endpointOne="day" endpointTwo="week" setEndpoint={setEndpoint}/>
            </div>
            <Carousel mediaType="movie" data={data}/>
        </div>      
    );
}

export default Trending;