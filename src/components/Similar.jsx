import { useEffect, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import { fetchDataFromApi } from '../api/tmdb';
import Carousel from './carousel/Carousel';
import { useParams } from 'react-router-dom';

function Similar({setId}) {

    const { mediaType, id } = useParams();
    const [similar, setSimilar] = useState();

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    useEffect(() => {
      getSimilar();
    }, [])

    const getSimilar = async () => {
        try {
            const data = await fetchDataFromApi(`/${mediaType}/${id}/similar`);
            setSimilar(data);
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    
    return (
        <div className='mb-20'>
            <div className='flex justify-center md:justify-start mb-5'>
                <h2 className='text-white text-2xl font-medium'>{title}</h2>
            </div>
            <Carousel mediaType={mediaType === "movie" ? "movie" : "tv"} data={similar} setId={setId}/>
        </div>
    );
}

export default Similar;