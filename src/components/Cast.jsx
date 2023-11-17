import { useEffect, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import { fetchDataFromApi } from '../api/tmdb';
import Carousel from './carousel/Carousel';
import { useParams } from 'react-router-dom';
import CastCard from './CastCard';

function Cast(props) {

    const { mediaType, id } = useParams();
    const [cast, setCast] = useState();

    useEffect(() => {
      getCast();
    }, [])

    const getCast = async () => {
        try {
            const data = await fetchDataFromApi(`/${mediaType}/${id}/credits`);
            console.log(data);
            setCast(data);
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    
    return (
        <div className='mb-20'>
            <div className='flex justify-center md:justify-start mb-5'>
                <h2 className='text-white text-2xl font-medium'>Top Cast</h2>
            </div>
            {cast?.cast && <CastCard data={cast?.cast} />}
            {/* <Carousel mediaType={mediaType === "movie" ? "movie" : "tv"} data={cast}/> */}
        </div>
    );
}

export default Cast;