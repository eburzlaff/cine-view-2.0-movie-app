import { useEffect, useState } from 'react';
import ContentWrapper from './ContentWrapper';
import { fetchDataFromApi } from '../api/tmdb';
import Carousel from './carousel/Carousel';
import { useParams } from 'react-router-dom';

function Recommendations({setId}) {

    const { mediaType, id } = useParams();
    const [recommendations, setRecommendations] = useState();

    useEffect(() => {
      getRecommendations();
    }, [])

    const getRecommendations = async () => {
        try {
            const data = await fetchDataFromApi(`/${mediaType}/${id}/recommendations`);
            setRecommendations(data);
            
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    
    return (
        <div className='mb-20'>
            <div className='flex justify-center md:justify-start mb-5'>
                <h2 className='text-white text-2xl font-medium'>Recommendations</h2>
            </div>
            <Carousel mediaType={mediaType === "movie" ? "movie" : "tv"} data={recommendations} setId={setId}/>
        </div>
    );
}

export default Recommendations;